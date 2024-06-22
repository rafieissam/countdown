import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-timer-controls',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './timer-controls.component.html',
  styleUrl: './timer-controls.component.scss'
})
export class TimerControlsComponent {
  @Input('isPaused') isPaused: boolean = true;
  @Output('toggle') toggleEmitter: EventEmitter<'resume' | 'pause'> = new EventEmitter<'resume' | 'pause'>();
  @Output('delete') deleteEmitter: EventEmitter<void> = new EventEmitter<void>();

  onToggle() {
    if (this.isPaused) {
      this.toggleEmitter.emit('resume');
    } else {
      this.toggleEmitter.emit('pause');
    }
  }

  onDelete() {
    this.deleteEmitter.emit();
  }
}
