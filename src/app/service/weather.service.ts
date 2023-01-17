import { EnvironmentInjector, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { IWeather } from '../model/weather';
import { map, Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { GeolocationService } from './geolocation.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  private weather: IWeather;

  constructor(private http:HttpClient, private geolocation: GeolocationService) { }

  convertToWeather(apiWeatherObject: IWeather){
    this.weather = apiWeatherObject;
    return this.weather;
  }

  getWeatherByCity( city: string ): Observable<IWeather> {
    let cityParams = new HttpParams().appendAll({
    'q': city,
    'appid': environment.weatherAPIKey,
    'units': 'metric',
    'lang': 'en',
    });
    return this.http.get(environment.weatherAPI, { params: cityParams }).pipe(
      map( apiWeatherObject => {
        return this.convertToWeather(apiWeatherObject as IWeather);
      })
    );
  }

  getWeatherByGeolocation(lat: number, lon: number): Observable<IWeather> {
    let cityParams = new HttpParams().appendAll({
    'lat': lat,
    'lon': lon,
    'appid': environment.weatherAPIKey,
    'units': 'metric',
    'lang': 'en',
    });
    return this.http.get(environment.weatherAPI, { params: cityParams }).pipe(
      map( apiWeatherObject => {
        return this.convertToWeather(apiWeatherObject as IWeather);
      })
    );
  }

  getWeatherImageURLByIconCode(iconCode: string) {
    return environment.weatherImageAPI + iconCode + '@2x.png';
  }

  getLocation() :Promise<any> {
    return new Promise((resolve, reject)=>{
      this.geolocation.getLocationService().then(resp =>{
        resolve({lon: resp.lon, lat: resp.lat, message: resp.message, allowed: resp.allowed})
      })
    })
  }

}
