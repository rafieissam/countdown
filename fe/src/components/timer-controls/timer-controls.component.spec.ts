import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimerControlsComponent } from './timer-controls.component';
import { CommonModule } from '@angular/common';

describe('TimerControlsComponent', () => {
  let component: TimerControlsComponent;
  let fixture: ComponentFixture<TimerControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, TimerControlsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit "resume" when onToggle is called and isPaused is true', () => {
    component.isPaused = true;
    spyOn(component.toggleEmitter, 'emit');
    
    component.onToggle();
    
    expect(component.toggleEmitter.emit).toHaveBeenCalledWith('resume');
  });

  it('should emit "pause" when onToggle is called and isPaused is false', () => {
    component.isPaused = false;
    spyOn(component.toggleEmitter, 'emit');
    
    component.onToggle();
    
    expect(component.toggleEmitter.emit).toHaveBeenCalledWith('pause');
  });

  it('should emit delete event when onDelete is called', () => {
    spyOn(component.deleteEmitter, 'emit');
    
    component.onDelete();
    
    expect(component.deleteEmitter.emit).toHaveBeenCalled();
  });

  it('should correctly toggle the state and emit the appropriate event', () => {
    spyOn(component.toggleEmitter, 'emit');
    
    component.isPaused = true;
    component.onToggle();
    expect(component.toggleEmitter.emit).toHaveBeenCalledWith('resume');
    
    component.isPaused = false;
    component.onToggle();
    expect(component.toggleEmitter.emit).toHaveBeenCalledWith('pause');
  });
});
