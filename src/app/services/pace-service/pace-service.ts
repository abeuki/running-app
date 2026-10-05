import { Injectable } from '@angular/core';
import { metres, minutesPerKilometer, seconds } from '../../models/datatypes';
import { PacePoint } from '../../models/PacePoint';
import { from, last, map, Observable, pairwise, scan } from 'rxjs';
import { RunPoint } from '../../models/RunPoint';

interface Segment{
  distance: metres;
  duration: seconds;
}
interface PaceState{
  elapsedTime: seconds;
  distance: metres;
  minute: number;
  pacePoints: PacePoint[];
}

@Injectable({
  providedIn: 'root',
})
export class PaceService {

  private walkingPace: minutesPerKilometer = 12;
  private thresholdPace: minutesPerKilometer = 0.4;

  calculatePace(points: RunPoint[]): Observable<PacePoint[]>{
    return from(points).pipe(

      pairwise(),

      map(([previous, current]) => {
        const currentTime = new Date(current.datetime).getTime();
        const previousTime = new Date(previous.datetime).getTime();
        const duration = (currentTime - previousTime) / 1000;

        const distance = this.calculateDistance(
          previous.latitude, previous.longitude,
          current.latitude, current.longitude)

        return {
          distance: distance,
          duration: duration 
        }
      }),

      scan((state: PaceState, segment: Segment): PaceState => {
        const elapsedTime = state.elapsedTime + segment.duration;
        const distance = state.distance + segment.distance;

        if(elapsedTime < 60){
          return {
            ...state,
            elapsedTime,
            distance
          };
        }

        //ako je proslo 60 sekundi
        const pace = (elapsedTime / 60) / (distance / 1000); //minuti po kilometru
        
        //onda se akumulirani pace dodaje u niz
        //i racuna sledeca tacka pace-a.
        //pace hoda (12min/km) i veci pace se ignorise
        if (pace <= this.walkingPace) {
          const pacePoint: PacePoint = {
            minute: state.minute,
            pace
          };

          const lastPacePoint =
            state.pacePoints[state.pacePoints.length - 1];

          //ako se pace dovoljno razlikuje od prethodnog
          //dodaje se
          if (
              !lastPacePoint ||
              Math.abs(pace - lastPacePoint.pace) >= this.thresholdPace
            ) {
            return {
              elapsedTime: 0,
              distance: 0,
              minute: state.minute + 1,
              pacePoints: [...state.pacePoints, pacePoint]
            };
          }
        }

        return {
          elapsedTime: 0,
          distance: 0,
          minute: state.minute + 1,
          pacePoints: state.pacePoints
        };
      }, {
        elapsedTime: 0,
        distance: 0,
        minute: 1,
        pacePoints: []
      }),

      last(),

      map(state => state.pacePoints)
    )
  }

  
  private calculateDistance(
    latitude1: number,
    longitude1: number,
    latitude2: number,
    longitude2: number
  ): number {

    const earthRadius = 6371000;


    const latitude1Rad =
      latitude1 * Math.PI / 180;

    const latitude2Rad =
      latitude2 * Math.PI / 180;


    const deltaLatitude =
      (latitude2 - latitude1) * Math.PI / 180;

    const deltaLongitude =
      (longitude2 - longitude1) * Math.PI / 180;


    const a =
      Math.sin(deltaLatitude / 2) *
      Math.sin(deltaLatitude / 2) +

      Math.cos(latitude1Rad) *
      Math.cos(latitude2Rad) *

      Math.sin(deltaLongitude / 2) *
      Math.sin(deltaLongitude / 2);


    const c =
      2 * Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );


    return earthRadius * c;
  }
}