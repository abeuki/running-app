import { Component } from '@angular/core';
import { RunsList } from '../runs-list/runs-list';
import { AppState } from '../../../app.state';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Run } from '../../../models/Run';
import { Runner } from '../../../models/Runner';
import * as Actions from '../../../store/runners/runners.actions'
import { selectSelectedRunnerId1, selectSelectedRunnerId2 } from '../../../store/runners/runners.selector';
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

  runnerId1: number | null = null;
  runnerId2: number | null = null;
   
  ngOnInit(){
    this.store.select(selectSelectedRunnerId1).subscribe(selectedId => 
      this.runnerId1 = selectedId
    );
    this.store.select(selectSelectedRunnerId2).subscribe(selectedId =>
      this.runnerId2 = selectedId
    );
  }

  
}
