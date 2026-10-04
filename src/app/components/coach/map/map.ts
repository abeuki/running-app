import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { RunPoint } from '../../../models/RunPoint';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map implements AfterViewInit, OnDestroy {

  @Input() runId!: number;

  private _runPoints: RunPoint[] = [];

  @Input()
  set runPoints(points: RunPoint[]) {
    this._runPoints = points;

    if (this.map && points.length > 0) {
      this.drawRoute();
    }
  }

  get runPoints(): RunPoint[] {
    return this._runPoints;
  }

  private map!: L.Map;
  private route?: L.Polyline;

  ngAfterViewInit() {

    const elementId = `map-${this.runId}`;

    this.map = L.map(elementId);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.drawRoute();
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  private drawRoute() {

    if (this.route) {
      this.route.remove();
    }

    if (this.runPoints.length === 0) {
      return;
    }

    const coordinates = this.runPoints.map(point => [
      point.latitude,
      point.longitude
    ] as L.LatLngExpression);

    this.route = L.polyline(coordinates);

    this.route.addTo(this.map);

    this.map.fitBounds(this.route.getBounds());
  }
}