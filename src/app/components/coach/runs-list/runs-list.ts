import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import * as Actions from '../../../store/runs/runs.actions'
import { Observable, of } from 'rxjs';
import { Run } from '../../../models/Run';
@Component({
  selector: 'app-runs-list',
  imports: [],
  templateUrl: './runs-list.html',
  styleUrl: './runs-list.css',
})
export class RunsList {
  @Input()
  runnerId: number = 0;

  runs$ : Observable<Run[]> = of();
  constructor(private store: Store<AppState>){

  }

  ngOnInit(){
    this.store.dispatch(Actions.loadRuns({runnerId: this.runnerId}));
    //this.runs$ = this.store.select()
  }
}
