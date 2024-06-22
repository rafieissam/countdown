import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventEmitter, Component, Output } from '@angular/core';
import { TimerComponent } from './timer.component';

@Component({ selector: 'app-timer-display', template: '' })
class MockTimerDisplayComponent {}

@Component({ selector: 'app-timer-controls', template: '' })
class MockTimerControlsComponent {
  @Output() toggle = new EventEmitter<'resume' | 'pause'>();
  @Output() delete = new EventEmitter<void>();
}

describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TimerComponent
      ],
      declarations: [
        MockTimerDisplayComponent,
        MockTimerControlsComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit toggle event when onTimerToggle is called', () => {
    spyOn(component.toggleEmitter, 'emit');
    component.onTimerToggle('pause');
    expect(component.toggleEmitter.emit).toHaveBeenCalledWith('pause');
  });

  it('should emit delete event when onTimerDelete is called', () => {
    spyOn(component.deleteEmitter, 'emit');
    component.onTimerDelete();
    expect(component.deleteEmitter.emit).toHaveBeenCalled();
  });
});
