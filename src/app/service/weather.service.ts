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
  private URLList={
    weatherAPICallByGeolocation: (latCode: number, lonCode: number, baseURLCode: string, apikey: string) => {
      let lat = latCode;
      let lon = lonCode;
      let key = apikey;
      let lang = 'en';
      let units = 'metric';
      let baseURL = baseURLCode;
      let url = `${baseURL}lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;
      return url;
    },
    weatherAPICallByCity: (cityCode: string, baseURLCode: string, apikey: string) => {
      let city = cityCode;
      let key = apikey;
      let lang = 'en';
      let units = 'metric';
      let baseURL = baseURLCode;
      let url = `${baseURL}q=${city}&appid=${key}&units=${units}&lang=${lang}`;
      return url;
    },
    weatherImgAPICall: (iconCode: string, baseURLCode: string) => {
      let icon = iconCode;
      let size = '@2x';
      let baseURL = baseURLCode;
      let url = `${baseURL}${icon}${size}.png`;
      return url;
    }
  }
  
  private weatherURLFetched: string;
  private weatherImageURLFetched: string;

  constructor(private http:HttpClient, private geolocation: GeolocationService) { }

  getWeatherByCity(city: string): Observable<IWeather> {
    this.weatherURLFetched = this.URLList.weatherAPICallByCity(city, environment.weatherURL, environment.weatherAPIKey) as string;
    return this.http.get<IWeather>(this.weatherURLFetched);
  }

  getWeatherByGeolocation(lat: number, lon: number): Observable<IWeather> {
    this.weatherURLFetched = this.URLList.weatherAPICallByGeolocation(lat, lon, environment.weatherURL, environment.weatherAPIKey) as string;
    return this.http.get<IWeather>(this.weatherURLFetched);
  }

  getWeatherImageURLByIconCode(iconCode: string) {
    return this.weatherImageURLFetched = this.URLList.weatherImgAPICall(iconCode, environment.weatherImageURL) as string;
  }

  getLocation() :Promise<any> {
    return new Promise((resolve, reject)=>{
      this.geolocation.getLocationService().then(resp =>{
        resolve({lon: resp.lon, lat: resp.lat, message: resp.message, allowed: resp.allowed})
      })
    })
  }

}
