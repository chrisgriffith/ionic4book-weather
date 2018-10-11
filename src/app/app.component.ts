import { Component } from '@angular/core';

import { Events, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LocationsService } from './locations.service';
import { WeatherLocation } from './weather-location';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages: Array<WeatherLocation>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private locationsService: LocationsService,
    public events: Events
  ) {
    this.initializeApp();
    this.getMyLocations();
    // events.subscribe('locations:updated', (data) => {
    //   this.getMyLocations();
    // });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // getMyLocations() {
  //   this.locationsService.getLocations().then(res => {
  //     this.appPages = [
  //       {
  //         title: 'Edit Locations',
  //         url: '/locations',
  //         icon: 'create'
  //       },
  //       {
  //         title: 'Current Location',
  //         url: '/weather',
  //         icon: 'pin',
  //         lat: null,
  //         lon: null
  //       }
  //     ];
  //     for (const newLoc of res) {
  //       this.appPages.push(newLoc);
  //     }
  //   });
  // }

  getMyLocations() {
    this.locationsService.locations$.subscribe((locs: Array<WeatherLocation>) => {
      this.appPages = [
        {
          title: 'Edit Locations',
          url: '/locations',
          icon: 'create'
        },
        {
          title: 'Current Location',
          url: '/weather',
          icon: 'pin',
          lat: null,
          lon: null
        }
      ];
      for (const newLoc of locs) {
        this.appPages.push(newLoc);
      }
    });
  }

}
