import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { Timer } from '../interfaces/timer';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  timers: Timer[] = [];
  timersSubject: BehaviorSubject<Timer[]> = new BehaviorSubject<Timer[]>([]);

  constructor(public socketService: SocketService) {
    this.listenSockets();
  }

  getTimers() {
    return this.timersSubject.asObservable();
  }

  generateId(): string {
    return "id" + Math.random().toString(16).slice(2);
  }

  /**
   * Generate a random amount of seconds equivalent to minutes in the range 10-20
   */
  randomSeconds(): number {
    return Math.floor(Math.random() * 10 * 60 + 1) + 10 * 60;
  }

  createTimer(seconds = this.randomSeconds()) {
    const timer: Timer = {
      id: this.generateId(),
      seconds,
      isPaused: false
    };
    this.timers.push(timer);
    this.syncSockets();
  }

  findTimerIndex(id: string): number {
    let ind = -1;
    this.timers.forEach((t, i) => {
      if (t.id == id) ind = i;
    });
    if (ind == -1) {
      throw "ID Not Found.";
    }
    return ind;
  }

  pauseTimer(id: string) {
    let timer = this.timers[this.findTimerIndex(id)];
    timer.isPaused = true;
    this.syncSockets();
  }

  resumeTimer(id: string) {
    let timer = this.timers[this.findTimerIndex(id)];
    timer.isPaused = false;
    this.syncSockets();
  }

  deleteTimer(id: string) {
    this.timers = this.timers.filter(t => t.id != id);
    this.syncSockets();
  }

  setTimers(timers: Timer[]) {
    this.timers = timers;
    this.notifyTimersChange();
  }

  notifyTimersChange() {
    this.timersSubject.next(this.timers);
  }

  listenSockets() {
    this.socketService.listenChanges().subscribe(timers => {
      this.setTimers(timers);
    });
  }

  syncSockets() {
    this.notifyTimersChange();
    this.socketService.syncSockets(this.timers);
  }

}
