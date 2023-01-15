import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  getLocationService():Promise<any> {
    return new Promise((resolve, reject)=>{
      navigator.geolocation.getCurrentPosition(resp=>{
        resolve({lon: resp.coords.longitude, lat: resp.coords.latitude, allowed: true})
      }, error=>{
        resolve({message: error.message, allowed: false})
      })
    })
  }
  
}
