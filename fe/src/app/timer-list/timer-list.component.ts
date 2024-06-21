import { Component, OnInit } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { TimerService } from '../timer.service';
import { Timer } from '../timer';

@Component({
  selector: 'app-timer-list',
  standalone: true,
  imports: [
    TimerComponent
  ],
  providers: [
    TimerService
  ],
  templateUrl: './timer-list.component.html',
  styleUrl: './timer-list.component.scss'
})
export class TimerListComponent implements OnInit {

  timers: Timer[] = [];

  constructor (private timerService: TimerService) { }
  
  ngOnInit(): void {
    this.subscribeToTimers();
  }

  subscribeToTimers() {
    this.timerService.getTimers().subscribe(timers => {
      this.timers = timers;
    });
  }

  onTimerAdd() {
    this.timerService.createTimer();
  }

  onTimerToggle(id: string, action: 'resume' | 'pause') {
    if (action == 'resume') {
      this.timerService.resumeTimer(id);
    } else {
      this.timerService.pauseTimer(id);
    }
  }

  onTimerDelete(id: string) {
    this.timerService.deleteTimer(id);
  }

}
