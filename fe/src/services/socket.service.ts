import { Injectable } from '@angular/core';
import { Timer } from '../interfaces/timer';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private timersSubj: BehaviorSubject<Timer[]> = new BehaviorSubject<Timer[]>([]);

  constructor() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', () => {
      this.socket.on('sync_client', (timersStr: string) => {
        const timers: Timer[] = JSON.parse(timersStr);
        this.timersSubj.next(timers);
      });
    });;
  }

  listenChanges() {
    return this.timersSubj.asObservable();
  }

  syncSockets(timers: Timer[]) {
    this.socket.emit('sync_server', JSON.stringify(timers));
  }
}
