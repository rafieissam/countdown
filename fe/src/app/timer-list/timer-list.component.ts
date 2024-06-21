import { Component } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-timer-list',
  standalone: true,
  imports: [
    TimerComponent
  ],
  templateUrl: './timer-list.component.html',
  styleUrl: './timer-list.component.scss'
})
export class TimerListComponent {

}
