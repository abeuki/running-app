import { Component, Input } from '@angular/core';
import { RunPoint } from '../../../models/RunPoint';
import { from, last, map, Observable, of, pairwise, scan, toArray } from 'rxjs';
import { metres, minutesPerKilometer, seconds } from '../../../models/datatypes';
import { AsyncPipe } from '@angular/common';

interface PacePoint{
  minute: number;
  pace: minutesPerKilometer;
}
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

@Component({
  selector: 'app-graph',
  imports: [AsyncPipe],
  templateUrl: './graph.html',
  styleUrl: './graph.css',
})
export class Graph {

  walkingPace: minutesPerKilometer = 12;

  pacePoints$: Observable<PacePoint[]> = of([]);

  _runPoints : RunPoint[] = [];

  @Input()
  set runPoints(points: RunPoint[]){
    this.pacePoints$ = from(points).pipe(

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
        
        //i ako je pace veci od 12min/km - pace hoda,
        //onda se akumulirani pace dodaje u niz
        //i racuna sledeca tacka pace-a.
        //pace hoda i veci pace se ignorise
        if (pace <= this.walkingPace) {
          const pacePoint: PacePoint = {
            minute: state.minute,
            pace
          };

          return {
            elapsedTime: 0,
            distance: 0,
            minute: state.minute + 1,
            pacePoints: [...state.pacePoints, pacePoint]
          };
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

  get runPoints(): RunPoint[] {return this._runPoints;}

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

  formatPace(pace: number): string {
    const minutes = Math.floor(pace);
    const seconds = Math.round((pace - minutes) * 60);

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
