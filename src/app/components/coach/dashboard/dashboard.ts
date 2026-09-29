import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Runner } from '../../../models/Runner';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  runnersList$: Observable<Runner[]> = of([]);
}
