import { Component } from '@angular/core';
import { JokeService } from './service/joke.service';
import { JokeComponent } from './component/joke/joke.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'WysioFrontendProject';
}
