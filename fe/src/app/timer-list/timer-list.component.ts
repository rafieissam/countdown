import { Component, OnInit } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { TimerService } from '../timer.service';
import { Timer } from '../timer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timer-list',
  standalone: true,
  imports: [
    CommonModule,
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
  sortedTimers: Timer[] = [];
  sortDir: 'asc' | 'desc' = 'desc';

  constructor (private timerService: TimerService) { }
  
  ngOnInit(): void {
    this.subscribeToTimers();
  }

  subscribeToTimers() {
    this.timerService.getTimers().subscribe(timers => {
      this.timers = timers;
      this.sortTimers();
    });
  }

  sortTimers() {
    this.sortedTimers = this.timers.sort((a, b) => {
      if (this.sortDir === 'asc') {
        return a.seconds - b.seconds;
      } else {
        return b.seconds - a.seconds;
      }
    });
  }

  setSortDirAsc() {
    this.setSortDir('asc');
  }

  setSortDirDesc() {
    this.setSortDir('desc');
  }

  setSortDir(dir: 'asc' | 'desc') {
    this.sortDir = dir;
    this.sortTimers();
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
