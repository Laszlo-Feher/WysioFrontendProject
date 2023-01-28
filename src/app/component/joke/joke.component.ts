import { Component, OnInit } from '@angular/core';
import { IJoke } from '../../model/joke';
import { JokeService } from '../../service/joke.service';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.sass']
})
export class JokeComponent implements OnInit {

  joke: IJoke;

  constructor(private jokeService:JokeService) { }

  ngOnInit(): void {
    this.setJoke();
  }

  private setJoke() : void {
    this.jokeService.getJoke()
    .subscribe(data => {
      this.joke = data;
      this.joke.icon_url = this.jokeService.getJokeImageURL();
    });
  }

}
