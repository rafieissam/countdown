import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimerListComponent } from './timer-list.component';
import { Timer } from '../../interfaces/timer';
import { of } from 'rxjs';

describe('TimerListComponent', () => {
  let component: TimerListComponent;
  let fixture: ComponentFixture<TimerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimerListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch timers on initialization', () => {
    const mockTimers: Timer[] = [{ id: '1', seconds: 10, isPaused: true }];

    spyOn(component.timerService, 'getTimers').and.returnValue(of(mockTimers));

    component.ngOnInit();
    
    expect(component.timers).toEqual(mockTimers);
    expect(component.sortedTimers).toEqual(mockTimers);
    expect(component.sortDir).toBe('desc');
  });

  it('should sort timers in ascending order', () => {
    const mockTimers: Timer[] = [
      { id: '1', seconds: 10, isPaused: true },
      { id: '2', seconds: 5, isPaused: true },
      { id: '3', seconds: 15, isPaused: true }
    ];

    component.timers = mockTimers;
    component.sortDir = 'asc';
    
    component.sortTimers();

    expect(component.sortedTimers).toEqual([
      { id: '2', seconds: 5, isPaused: true },
      { id: '1', seconds: 10, isPaused: true },
      { id: '3', seconds: 15, isPaused: true }
    ]);
  });

  it('should set sort direction to ascending', () => {
    component.setSortDirAsc();
    expect(component.sortDir).toBe('asc');
  });

  it('should set sort direction to descending', () => {
    component.setSortDirDesc();
    expect(component.sortDir).toBe('desc');
  });

  it('should call timerService.createTimer() on onTimerAdd()', () => {
    spyOn(component.timerService, 'createTimer');
    component.onTimerAdd();
    expect(component.timerService.createTimer).toHaveBeenCalled();
  });

  it('should call timerService.resumeTimer() on onTimerToggle() with action "resume"', () => {
    const id = '1';
    spyOn(component.timerService, 'resumeTimer');
    component.onTimerToggle(id, 'resume');
    expect(component.timerService.resumeTimer).toHaveBeenCalledWith(id);
  });

  it('should call timerService.pauseTimer() on onTimerToggle() with action "pause"', () => {
    const id = '1';
    spyOn(component.timerService, 'pauseTimer');
    component.onTimerToggle(id, 'pause');
    expect(component.timerService.pauseTimer).toHaveBeenCalledWith(id);
  });

  it('should call timerService.deleteTimer() on onTimerDelete()', () => {
    const id = '1';
    spyOn(component.timerService, 'deleteTimer');
    component.onTimerDelete(id);
    expect(component.timerService.deleteTimer).toHaveBeenCalledWith(id);
  });
});
