import { Component } from '@angular/core';
import { RunsList } from '../runs-list/runs-list';
import { AppState } from '../../../app.state';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap } from 'rxjs';
import { Run } from '../../../models/Run';
import { Runner } from '../../../models/Runner';
import * as Actions from '../../../store/runners/runners.actions'
import { selectSelectedRunner1, selectSelectedRunner2, selectSelectedRunnerId1, selectSelectedRunnerId2 } from '../../../store/runners/runners.selector';
import { loadRuns } from '../../../store/runs/runs.actions';
import { selectRuns, selectRunsForRunner1, selectRunsForRunner2 } from '../../../store/runs/runs.selector';
@Component({
  selector: 'app-all-runs',
  imports: [RunsList],
  templateUrl: './all-runs.html',
  styleUrl: './all-runs.css',
})
export class AllRuns {
  constructor(
    private store: Store<AppState>
  ){

  }
  runner1: Runner | null = null;
  runs1: Run[] = [];
  
  runner2: Runner | null = null;
  runs2: Run[] = [];
   
  ngOnInit(){
    this.store.dispatch(loadRuns());

    this.store.select(selectSelectedRunner1).subscribe(runner =>
      this.runner1 = runner
    );
    this.store.select(selectSelectedRunner2).subscribe(runner =>
      this.runner2 = runner
    );

    this.store.select(selectRunsForRunner1).subscribe(runs => 
      this.runs1 = runs
    )

    this.store.select(selectRunsForRunner2).subscribe(runs => 
      this.runs2 = runs
    )
  }

}
