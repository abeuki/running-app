import { Component, Input } from '@angular/core';
import { Run } from '../../../models/Run';
import { Graph } from '../graph/graph';
import { Observable, of } from 'rxjs';
import { RunPoint } from '../../../models/RunPoint';
import { AppState } from '../../../app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-run-overview',
  imports: [Graph],
  templateUrl: './run-overview.html',
  styleUrl: './run-overview.css',
})
export class RunOverview {
  @Input()
  run: Run | null = null;

  runPoints$ : Observable<RunPoint[]> = of();

  expanded = false;

  constructor(private store: Store<AppState>){}

  toggle(){
    this.expanded = !this.expanded;
  }

  ngOnInit(){
    this.runPoints$ = this.store.select(selectRunPoints({runId: this.run?.id}));
  }
}

