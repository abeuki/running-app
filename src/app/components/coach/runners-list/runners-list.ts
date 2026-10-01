import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Runner } from '../../../models/Runner';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import * as Actions from '../../../store/runners/runners.actions'
import { selectRunnersList } from '../../../store/runners/runners.selector';
import { AsyncPipe } from '@angular/common';
import { RunnerPreview } from '../runner-preview/runner-preview';
@Component({
  selector: 'app-runners-list',
  imports: [AsyncPipe, RunnerPreview],
  templateUrl: './runners-list.html',
  styleUrl: './runners-list.css',
})
export class RunnersList {
  runners$: Observable<Runner[]> = of([]);

  constructor(
    private store:Store<AppState>
  ){

  }
  ngOnInit(){
    this.store.dispatch(Actions.loadRunners());
    this.runners$ = this.store.select(selectRunnersList);
  }

  onRunnerClick(runner: Runner){
    this.store.dispatch(Actions.selectRunner({
      runnerId: runner.id
    }))
  }
}
