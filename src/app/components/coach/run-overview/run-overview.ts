import { Component, Input } from '@angular/core';
import { Run } from '../../../models/Run';

@Component({
  selector: 'app-run-overview',
  imports: [],
  templateUrl: './run-overview.html',
  styleUrl: './run-overview.css',
})
export class RunOverview {
  @Input()
  run: Run | null = null;

  
}
