import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { IJoke } from '../model/joke';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JokeService {

  private jokeURLFetched: string = environment.jokeUrl;

  constructor(private http:HttpClient) { }

  getJoke(): Observable<IJoke> {
    return this.http.get<IJoke>(this.jokeURLFetched);
  }
}
