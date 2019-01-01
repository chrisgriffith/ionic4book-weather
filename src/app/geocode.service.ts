import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherLocation } from './weather-location';

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {
  apikey: String = 'YOUR-API-KEY';

  constructor(private http: HttpClient) { }

  getLatLong(address: string) {
    return new Promise<WeatherLocation>(resolve => {
      this.http.get<any>('https://maps.googleapis.com/maps/api/geocode/json?address='
        + encodeURIComponent(address) + '&key=' + this.apikey)
        .subscribe(response => {
          if (response.status === 'OK') {
            resolve({
              id: response.results[0].geometry.location.lat,
              title: response.results[0].formatted_address,
              url: '/weather',
              icon: 'pin',
              lat: response.results[0].geometry.location.lat,
              lon: response.results[0].geometry.location.lng
            });
          } else {
            console.log(response);
            // reject
          }
        });
    });
  }

}
