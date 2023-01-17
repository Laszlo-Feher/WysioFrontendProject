import { Component, OnInit } from '@angular/core';
import { IWeather } from '../../model/weather';
import { WeatherService } from '../../service/weather.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.sass']
})
export class WeatherComponent implements OnInit {

  weather: IWeather;
  weatherImageURL: string;
  weatherType: string;
  newLocationForm !: FormGroup;

  constructor(private weatherService:WeatherService, private _snackBar: MatSnackBar, private form : FormBuilder) { }

  ngOnInit(): void {
    this.setLocationByGeolocation();
    this.newLocationForm = this.form.group({
      city : ['', Validators.required]
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "OK");
  }

  newPosition(){
    this.setWeatherByCity(this.newLocationForm.value.city);
  }

  currentPosition() {
    this.setLocationByGeolocation();
  }

  private setWeatherByCity(city: string) : void {
    this.weatherService.getWeatherByCity(city)
    .subscribe(data => {
      this.weather = data;
      this.weatherImageURL = this.weatherService.getWeatherImageURLByIconCode(this.weather.weather[0].icon);
      this.weatherType = this.weather.weather[0].main;
    });
  }

  private setLocationByGeolocation():Promise<any> {
    return new Promise((resolve, reject)=>{
      this.weatherService.getLocation().then(resp=>{
        resolve(resp.allowed ? this.setWeatherByGeolocation(resp.lat, resp.lon) : this.openSnackBar(resp.message))
      })
    })
  }

  private setWeatherByGeolocation(lat: number, lon: number) : void {
    this.weatherService.getWeatherByGeolocation(lat, lon)
    .subscribe(data => {
      this.weather = data;
      this.weatherImageURL = this.weatherService.getWeatherImageURLByIconCode(this.weather.weather[0].icon);
      this.weatherType = this.weather.weather[0].main;
    });
  }
}
