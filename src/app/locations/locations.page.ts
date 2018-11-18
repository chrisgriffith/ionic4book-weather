import { Component, OnInit } from '@angular/core';
import { AlertController, Events } from '@ionic/angular';
import { LocationsService } from '../locations.service';
import { WeatherLocation } from '../weather-location';
import { GeoCodeService } from '../geocode.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
})
export class LocationsPage implements OnInit {
  public locs: Array<WeatherLocation>;

  constructor(
    public locationsService: LocationsService,
    public alertCtlr: AlertController,
    public geoCodeService: GeoCodeService,
    public events: Events
  ) {

    // locationsService.getLocations().then(res => {
    //   this.locs = res;
    // });

    locationsService.locations$.subscribe( ( locs: Array<WeatherLocation> ) => {
      this.locs = locs;
    });

  }

  ngOnInit() {
  }

  deleteLocation(loc) {
    this.locationsService.removeLocation(loc);
    // this.events.publish('locations:updated', {});
  }

  addLocation() {
    this.alertCtlr.create({
      header: 'Add a City',
      inputs: [
        {
          type: 'text',
          name: 'cityName',
          id: 'cityName',
          value: '',
          placeholder: 'City Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            // Array
            if (data.cityName !== '') {
              this.reverseGeoCode(data.cityName);
            }
          }
        }
      ]
    }).then(myAlert => myAlert.present());
  }

  reverseGeoCode(theCityName: string) {
    this.geoCodeService.getLatLong(theCityName)
      .then(res => {
        const newLoc: WeatherLocation = {
          title: '',
          url: '/weather',
          icon: 'pin',
          lat: 0,
          lon: 0
        };
        newLoc.title = res.title;
        newLoc.lat = res.lat;
        newLoc.lon = res.lon;
        this.locationsService.addLocation(newLoc);
        // this.events.publish('locations:updated', {});
      }).catch(err => {
        console.log(err);
      });
  }
}
