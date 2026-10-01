import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Runner } from '../../../models/Runner';

@Component({
  selector: 'app-runner-preview',
  imports: [],
  templateUrl: './runner-preview.html',
  styleUrl: './runner-preview.css',
})
export class RunnerPreview {

  @Input()
  runner : Runner | null = null;

  @Output()
  runnerClick: EventEmitter<Runner> = new EventEmitter<Runner>();
  
  clicked(){
    if(this.runner)
      this.runnerClick.emit(this.runner);
  }
}
