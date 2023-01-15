import { EnvironmentInjector, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IWeather } from '../model/weather';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { GeolocationService } from './geolocation.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private weatherURLFetched: string;
  private weatherImageURLFetched: string;

  constructor(private http:HttpClient, private geolocation: GeolocationService) { }

  getWeatherAPIByCity(city: string): Observable<IWeather> {
    this.weatherURLFetched = environment.weatherAPICallByCity(city) as string;
    return this.http.get<IWeather>(this.weatherURLFetched);
  }

  getWeatherAPIByGeolocation(lat: number, lon: number): Observable<IWeather> {
    this.weatherURLFetched = environment.weatherAPICallByGeolocation(lat, lon) as string;
    return this.http.get<IWeather>(this.weatherURLFetched);
  }

  getWeatherImage(iconCode: string) {
    return this.weatherImageURLFetched = environment.weatherImgAPICall(iconCode) as string;
  }

  getLocation() :Promise<any> {
    return new Promise((resolve, reject)=>{
      this.geolocation.getLocationService().then(resp =>{
        resolve({lon: resp.lon, lat: resp.lat, message: resp.message, allowed: resp.allowed})
      })
    })
  }

}
