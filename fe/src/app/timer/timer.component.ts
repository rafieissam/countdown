import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent {
  minutes = 10;
  seconds = 56;
  isPaused = true;
}
