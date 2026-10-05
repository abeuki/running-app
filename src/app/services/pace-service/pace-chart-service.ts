import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
import { PaceSegment } from '../../models/PaceSegment';

@Injectable({
  providedIn: 'root',
})
export class PaceChartService {

  createChartOptions(
    paceSegments: PaceSegment[],
    canEdit: boolean
  ): Highcharts.Options {

    return {

      chart: {
        type: 'column'
      },

      title: {
        text: 'Pace'
      },

      xAxis: {
        title: {
          text: 'Minut trčanja'
        },
        min: 1
      },

      yAxis: {
        title: {
          text: 'Pace (min/km)'
        }
      },

      tooltip: {
        formatter: function (this: Highcharts.Point) {

          const point = this as any;

          return `
            <b>${point.startMinute}.–${point.endMinute}. minut</b><br>
            Pace: ${point.y.toFixed(2)} min/km
          `;
        }
      },

      plotOptions: {

        column: {

          grouping: false,

          pointPadding: 0,

          groupPadding: 0,

          borderWidth: 1,

          cursor: canEdit ? 'ns-resize' : 'default',

          dragDrop: canEdit
            ? {
                draggableY: true,
                dragMinY: 3,
                dragMaxY: 12,
                dragPrecisionY: 0.05
              }
            : undefined
        }
      },

      series: paceSegments.map(segment => ({
        type: 'column' as const,

        name: `${segment.startMinute}–${segment.endMinute}`,

        pointPadding: 0,
        groupPadding: 0,

        pointRange: segment.endMinute - segment.startMinute,

        data: [
          {
            x: (segment.startMinute + segment.endMinute) / 2,
            y: segment.pace,

            startMinute: segment.startMinute,
            endMinute: segment.endMinute
          }
        ]
      }))
    };
  }
}