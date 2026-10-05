import { Component, Input } from '@angular/core';
import { RunPoint } from '../../../models/RunPoint';
import { from, last, map, Observable, of, pairwise, scan, toArray } from 'rxjs';
import { metres, minutesPerKilometer, seconds } from '../../../models/datatypes';
import { AsyncPipe } from '@angular/common';
import { PacePoint } from '../../../models/PacePoint';
import { PaceService } from '../../../services/pace-service/pace-service';


@Component({
  selector: 'app-graph',
  imports: [AsyncPipe],
  templateUrl: './graph.html',
  styleUrl: './graph.css',
})
export class Graph {

  constructor(private paceService: PaceService){}

  pacePoints$: Observable<PacePoint[]> = of([]);

  _runPoints : RunPoint[] = [];

  @Input()
  set runPoints(points: RunPoint[]){
    this.pacePoints$ = this.paceService.calculatePace(points);
  }

  get runPoints(): RunPoint[] {return this._runPoints;}


  formatPace(pace: number): string {
    const totalSeconds = Math.round(pace * 60);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
