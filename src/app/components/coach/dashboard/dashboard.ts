import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Runner } from '../../../models/Runner';
import { Store } from '@ngrx/store';
import * as Actions from "../../../store/store.actions"
import { selectRunnersList } from '../../../store/store.selector';
import { AppState } from '../../../app.state';
import { AsyncPipe } from '@angular/common';
import { RunnerPreview } from '../runner-preview/runner-preview';


@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, RunnerPreview],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  runners$: Observable<Runner[]> = of([]);

  constructor(
    private store:Store<AppState>
  ){

  }
  ngOnInit(){
    this.store.dispatch(Actions.loadRunners());
    this.runners$ = this.store.select(selectRunnersList);
  }
}
