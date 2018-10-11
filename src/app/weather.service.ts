import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentLoc } from './current-loc';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  // private _dataURL = 'assets/data.json';
  private _dataURL = '/forecast/<KEY>/';
  // private _dataURL = 'https://api.darksky.net/forecast/<KEY>/37.8267,-122.4233';

  private _weatherData: Array<any>;
  private _currentLoc: CurrentLoc = { lat: null, lon: null, timestamp: null };

  constructor(private http: HttpClient) { }

  getWeather(currentLoc: CurrentLoc, forceRefresh?: Boolean): Observable<any> {
    if (this._currentLoc !== currentLoc) {
      this._currentLoc.lat = currentLoc.lat;
      this._currentLoc.lon = currentLoc.lon;
      this._currentLoc.timestamp = currentLoc.timestamp;

      return this.http.get<any[]>(this._dataURL + currentLoc.lat + ',' + currentLoc.lon).pipe(
        map(data => this._weatherData = data)
      );
    } else {
      if (forceRefresh) {
        return this.http.get<any[]>(this._dataURL + currentLoc.lat + ',' + currentLoc.lon).pipe(
          map(data => this._weatherData = data)
        );
      } else {
        if (this._weatherData !== undefined && this._weatherData.length !== 0) {
          return of(this._weatherData);
        }
      }
    }
  }
}
