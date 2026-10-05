import { Component, Input } from '@angular/core';
import { RunPoint } from '../../../models/RunPoint';
import { from, last, map, Observable, of, pairwise, scan, toArray } from 'rxjs';
import { metres, minutesPerKilometer, seconds } from '../../../models/datatypes';
import { AsyncPipe } from '@angular/common';
import { PaceSegment } from '../../../models/PaceSegment';
import { PaceService } from '../../../services/pace-service/pace-service';
import { PaceChartService } from '../../../services/pace-service/pace-chart-service';
import {HighchartsChartComponent} from 'highcharts-angular'
import * as Highcharts from 'highcharts'

@Component({
  selector: 'app-graph',
  imports: [HighchartsChartComponent],
  templateUrl: './graph.html',
  styleUrl: './graph.css',
})
export class Graph {

  constructor(private paceService: PaceService,
    private paceChartService : PaceChartService
  ){}

  paceSegments$: Observable<PaceSegment[]> = of([]);

  chartOptions: Highcharts.Options = {};

  _runPoints : RunPoint[] = [];

  @Input()
  set runPoints(points: RunPoint[]){

    this.paceSegments$ = this.paceService.calculatePace(points);
    
    this.paceSegments$.subscribe(paceSegments => {
      this.chartOptions =
        this.paceChartService.createChartOptions(
          paceSegments,
          true
        );
    });
  }

  get runPoints(): RunPoint[] {return this._runPoints;}


  formatPace(pace: number): string {
    const totalSeconds = Math.round(pace * 60);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
