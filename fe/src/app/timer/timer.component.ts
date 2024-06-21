import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Timer } from '../timer';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnChanges {
  @Input('seconds') secondsInput: number = 0;
  @Input('isPaused') isPausedInput: boolean = true;
  @Output('toggle') toggleEmitter: EventEmitter<'resume' | 'pause'> = new EventEmitter<'resume' | 'pause'>();
  @Output('delete') deleteEmitter: EventEmitter<void> = new EventEmitter<void>();

  minutes = 0;
  seconds = 0;
  isPaused = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['secondsInput']) {
      const { mins, secs } = this.mapTime(changes['secondsInput'].currentValue);
      this.minutes = mins;
      this.seconds = secs;
    }
    if (changes['isPausedInput']) {
      this.isPaused = changes['isPausedInput'].currentValue;
    }
  }

  mapTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds - mins * 60;
    return { mins, secs };
  }

  toggleClick() {
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
