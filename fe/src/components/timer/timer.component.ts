import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimerDisplayComponent } from '../timer-display/timer-display.component';
import { TimerControlsComponent } from '../timer-controls/timer-controls.component';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [
    CommonModule,
    TimerDisplayComponent,
    TimerControlsComponent
  ],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent {
  @Input('seconds') secondsInput: number = 0;
  @Input('isPaused') isPaused: boolean = true;
  @Output('toggle') toggleEmitter: EventEmitter<'resume' | 'pause'> = new EventEmitter<'resume' | 'pause'>();
  @Output('delete') deleteEmitter: EventEmitter<void> = new EventEmitter<void>();

  onTimerToggle(action: 'resume' | 'pause') {
    this.toggleEmitter.emit(action);
  }

  onTimerDelete() {
    this.deleteEmitter.emit();
  }

}
