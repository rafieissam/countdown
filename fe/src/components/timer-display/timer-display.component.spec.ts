import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimerDisplayComponent } from './timer-display.component';
import { SimpleChanges, SimpleChange } from '@angular/core';

describe('TimerDisplayComponent', () => {
  let component: TimerDisplayComponent;
  let fixture: ComponentFixture<TimerDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimerDisplayComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly map seconds to minutes and seconds', () => {
    const result = component.mapTime(125);
    expect(result).toEqual({ mins: 2, secs: 5 });

    const result2 = component.mapTime(59);
    expect(result2).toEqual({ mins: 0, secs: 59 });

    const result3 = component.mapTime(3600);
    expect(result3).toEqual({ mins: 60, secs: 0 });
  });

  it('should update minutes and seconds on ngOnChanges', () => {
    const changes: SimpleChanges = {
      secondsInput: new SimpleChange(null, 125, false)
    };

    component.ngOnChanges(changes);

    expect(component.minutes).toBe(2);
    expect(component.seconds).toBe(5);
  });

  it('should handle initial secondsInput correctly', () => {
    component.secondsInput = 125;
    fixture.detectChanges();

    const changes: SimpleChanges = {
      secondsInput: new SimpleChange(null, 125, true)
    };
    component.ngOnChanges(changes);

    expect(component.minutes).toBe(2);
    expect(component.seconds).toBe(5);
  });

  it('should handle changes to secondsInput correctly', () => {
    const initialChanges: SimpleChanges = {
      secondsInput: new SimpleChange(null, 125, true)
    };
    component.ngOnChanges(initialChanges);

    expect(component.minutes).toBe(2);
    expect(component.seconds).toBe(5);

    const newChanges: SimpleChanges = {
      secondsInput: new SimpleChange(125, 59, false)
    };
    component.ngOnChanges(newChanges);

    expect(component.minutes).toBe(0);
    expect(component.seconds).toBe(59);
  });
});
