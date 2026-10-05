import { Component, Input } from '@angular/core';
import { Run } from '../../../models/Run';
import { Graph } from '../graph/graph';
import { Observable, of, take } from 'rxjs';
import { RunPoint } from '../../../models/RunPoint';
import { AppState } from '../../../app.state';
import { Store } from '@ngrx/store';
import { selectLoadedRunIds, selectRunPointsByRunId } from '../../../store/runPoints/runpoints.selector';
import { loadRunPointsByRunId } from '../../../store/runPoints/runpoints.actions';
import { AsyncPipe } from '@angular/common';
import { Map } from '../map/map';

@Component({
  selector: 'app-run-overview',
  imports: [Graph, AsyncPipe, Map],
  templateUrl: './run-overview.html',
  styleUrl: './run-overview.css',
})
export class RunOverview {
  loadedRunIds$ : Observable<number[]> = of();
  runPoints$ : Observable<RunPoint[]> = of();

  @Input()
  set run(value: Run | null) {
    this._run = value;

    if (value) {
      this.runPoints$ = this.store.select(selectRunPointsByRunId(value.id));
    } else {
      this.runPoints$ = of([]);
    }
  }

  get run(): Run | null {
    return this._run;
  }

  private _run: Run | null = null;
  expanded = false;

  constructor(private store: Store<AppState>){
    this.loadedRunIds$ = this.store.select(selectLoadedRunIds);
  }


  toggle(){
    this.expanded = !this.expanded;

    if(this.expanded && this.run)
    {
      this.loadedRunIds$
      .pipe(
        take(1) //jednom zelim da proverim da li su koordinate ucitane, ne svaki put
        //kad se loadedRunIds izmeni
      )
      .subscribe(loadedRunIds => {
        if(!loadedRunIds.includes(this.run!.id)){
          this.store.dispatch(loadRunPointsByRunId({runId: this.run!.id}))
        }
      })
    }
    
  }
}

