import { Injectable } from '@angular/core';
import { Timer } from './timer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() { }

  listenChanges() {
    return new Observable<Timer[]>(subscriber => {
      subscriber.next([]);
    });
  }

  syncSockets(timers: Timer[]) {
    console.table(timers);
  }
}
