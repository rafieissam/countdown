import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TimerService } from './timer.service';
import { Timer } from '../interfaces/timer';
import { of } from 'rxjs';

describe('TimerService', () => {
  let service: TimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimerService]
    });

    service = TestBed.inject(TimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate a random number of seconds between 600 and 1200', () => {
    for (let i = 0; i < 1000; i++) {
      const seconds = service.randomSeconds();
      expect(seconds).toBeGreaterThanOrEqual(600);
      expect(seconds).toBeLessThanOrEqual(1200);
    }
  });

  it('should create a timer with random seconds', () => {
    spyOn(service, 'randomSeconds').and.returnValue(900);
    service.createTimer();
    expect(service.timers.length).toBe(1);
    expect(service.timers[0].seconds).toBe(900);
    expect(service.timers[0].isPaused).toBe(false);
  });

  it('should pause a timer', () => {
    service.createTimer(600);
    const timer = service.timers[0];
    service.pauseTimer(timer.id);
    expect(service.timers[0].isPaused).toBe(true);
  });

  it('should resume a timer', () => {
    service.createTimer(600);
    const timer = service.timers[0];
    service.pauseTimer(timer.id);
    service.resumeTimer(timer.id);
    expect(service.timers[0].isPaused).toBe(false);
  });

  it('should delete a timer', () => {
    service.createTimer(600);
    const timer = service.timers[0];
    service.deleteTimer(timer.id);
    expect(service.timers.length).toBe(0);
  });

  it('should set timers', () => {
    const timers: Timer[] = [
      { id: '1', seconds: 600, isPaused: false },
      { id: '2', seconds: 1200, isPaused: true }
    ];
    service.setTimers(timers);
    expect(service.timers.length).toBe(2);
    expect(service.timers).toEqual(timers);
  });

  it('should listen to socket changes and update timers', () => {
    const timers: Timer[] = [
      { id: '1', seconds: 600, isPaused: false },
      { id: '2', seconds: 1200, isPaused: true }
    ];
    spyOn(service.socketService, 'listenChanges').and.returnValue(of(timers));
    service.listenSockets();
    expect(service.timers.length).toBe(2);
    expect(service.timers).toEqual(timers);
  });

  it('should synchronize timers with sockets', () => {
    spyOn(service.socketService, 'syncSockets');
    service.createTimer(600);
    expect(service.socketService.syncSockets).toHaveBeenCalledWith(service.timers);
  });
});
