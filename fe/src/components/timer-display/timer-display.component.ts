import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-timer-display',
  standalone: true,
  imports: [],
  templateUrl: './timer-display.component.html',
  styleUrl: './timer-display.component.scss'
})
export class TimerDisplayComponent {
  @Input('seconds') secondsInput: number = 0;

  minutes = 0;
  seconds = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['secondsInput']) {
      const { mins, secs } = this.mapTime(changes['secondsInput'].currentValue);
      this.minutes = mins;
      this.seconds = secs;
    }
  }

  mapTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds - mins * 60;
    return { mins, secs };
  }

}
