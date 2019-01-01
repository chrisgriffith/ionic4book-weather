import { Injectable } from '@angular/core';
import { WeatherLocation } from './weather-location';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  locations: Array<WeatherLocation>;
  locationsSubject: BehaviorSubject<Array<WeatherLocation>> = new BehaviorSubject([]);
  locations$: Observable<Array<WeatherLocation>> = this.locationsSubject.asObservable();

  constructor() {
    this.locations = [
      {
        id: 28.3922,
        title: 'Cape Canaveral, FL',
        url: '/weather',
        icon: 'pin',
        lat: 28.3922,
        lon: -80.6077
      },
      {
        id: 37.7749,
        title: 'San Francisco, CA',
        url: '/weather',
        icon: 'pin',
        lat: 37.7749,
        lon: -122.4194
      },
      {
        id: 49.2827,
        title: 'Vancouver, BC',
        url: '/weather',
        icon: 'pin',
        lat: 49.2827,
        lon: -123.1207
      },
      {
        id: 43.0742365,
        title: 'Madison, WI',
        url: '/weather',
        icon: 'pin',
        lat: 43.0742365,
        lon: -89.381011899
      }
    ];
    this.refreshLocations();
  }

  getLocations() {
    return Promise.resolve(this.locations);
  }

  removeLocation(loc: WeatherLocation) {
    const index = this.locations.indexOf(loc);
    if (index !== -1) {
      this.locations.splice(index, 1);
      this.refreshLocations();
    }
  }

  addLocation(loc: WeatherLocation) {
    this.locations.push(loc);
    this.refreshLocations();
  }

  refreshLocations () {
    this.locationsSubject.next(this.locations);
  }

}
