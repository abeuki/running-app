import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import * as Actions from '../../../store/runs/runs.actions'
import { Observable, of } from 'rxjs';
import { Run } from '../../../models/Run';
import { selectRuns } from '../../../store/runs/runs.selector';
import { Runner } from '../../../models/Runner';
import { RunOverview } from '../run-overview/run-overview';
@Component({
  selector: 'app-runs-list',
  imports: [RunOverview],
  templateUrl: './runs-list.html',
  styleUrl: './runs-list.css',
})
export class RunsList {
  @Input()
  runner: Runner | null = null;

  @Input()
  runs : Run[] = [];

  constructor(private store: Store<AppState>){

  }
}
