import { Injectable } from '@angular/core';
import { metres, minutesPerKilometer, seconds } from '../../models/datatypes';
import { PaceSegment } from '../../models/PaceSegment';
import { from, last, map, Observable, of, pairwise, scan } from 'rxjs';
import { RunPoint } from '../../models/RunPoint';

interface Segment{
  distance: metres;
  duration: seconds;
}
interface PaceState{
  elapsedTime: seconds;
  distance: metres;
  currentMinute: number;
  paceSegments: PaceSegment[];
}

@Injectable({
  providedIn: 'root',
})
export class PaceService {

  private walkingPace: minutesPerKilometer = 12;
  private thresholdPace: minutesPerKilometer = 0.4;

  calculatePace(points: RunPoint[]): Observable<PaceSegment[]>{
    if(points.length < 2){
      return of([]);
    }
    
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
          distance,
          duration 
        }
      }),

      scan(
        (state: PaceState, segment: Segment): PaceState => {

          const elapsedTime =
            state.elapsedTime + segment.duration;

          const distance =
            state.distance + segment.distance;

          if (elapsedTime < 60) {
            return {
              ...state,
              elapsedTime,
              distance
            };
          }
          
          //kraj merenja jednog minuta

          const pace =
            (elapsedTime / 60) /
            (distance / 1000);

          const currentMinute =
            state.currentMinute;

          const lastSegment =
            state.paceSegments[
              state.paceSegments.length - 1
            ];

          if(pace > this.walkingPace){
            return{
              ...state,
              elapsedTime: 0,
              distance: 0,
              currentMinute: currentMinute + 1
            }
          }
        
          // prvi segment
          if (!lastSegment) {

            return {
              elapsedTime: 0,
              distance: 0,
              currentMinute: currentMinute + 1,

              paceSegments: [
                {
                  startMinute: currentMinute,
                  endMinute: currentMinute + 1,
                  pace
                }
              ]
            };
          }

          // ako je pace dovoljno slican,
          // produzava se postojeći segment
          if (Math.abs(pace - lastSegment.pace) < this.thresholdPace) 
          {
            return {
              elapsedTime: 0,
              distance: 0,
              currentMinute: currentMinute + 1,

              paceSegments: [
                ...state.paceSegments.slice(0, -1),

                {
                  ...lastSegment,
                  endMinute: currentMinute + 1
                }
              ]
            };
          }

          // Pace se dovoljno promenio,
          // pocinjemo novi segment
          return {
            elapsedTime: 0,
            distance: 0,
            currentMinute: currentMinute + 1,

            paceSegments: [
              ...state.paceSegments,

              {
                startMinute: currentMinute,
                endMinute: currentMinute + 1,
                pace
              }
            ]
          };
        },

        {
          elapsedTime: 0,
          distance: 0,
          currentMinute: 1,
          paceSegments: []
        }
      ),

      last(),

      map(state => state.paceSegments)
    );
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