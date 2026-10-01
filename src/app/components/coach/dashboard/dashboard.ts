import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Runner } from '../../../models/Runner';
import { Store } from '@ngrx/store';
import * as Actions from "../../../store/runners/runners.actions"
import { selectRunnersList } from '../../../store/runners/runners.selector';
import { AppState } from '../../../app.state';
import { AsyncPipe } from '@angular/common';
import { RunnerPreview } from '../runner-preview/runner-preview';
import { RunnersList } from '../runners-list/runners-list';
import { AllRuns } from '../all-runs/all-runs';


@Component({
  selector: 'app-dashboard',
  imports: [RunnersList, AllRuns],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  
}
