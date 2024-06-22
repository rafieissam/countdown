import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimerListComponent } from '../components/timer-list/timer-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TimerListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
