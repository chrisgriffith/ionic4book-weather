import { Component, OnInit } from '@angular/core';
import { WeatherLocation } from '../weather-location';
import { LocationsService } from '../locations.service';
import { GeocodeService } from '../geocode.service';
import { AlertController, Events } from '@ionic/angular';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
})
export class LocationsPage implements OnInit {
  public locs: Array<WeatherLocation>;

  constructor(private locationsService: LocationsService,
    private alertCtlr: AlertController,
    private geoCodeService: GeocodeService,
    private events: Events) { }

  ngOnInit() {
    // this.locationsService.getLocations().then(res => {
    //   this.locs = res;
    // });
    this.locationsService.locations$
      .subscribe((locs: Array<WeatherLocation>) => {
        this.locs = locs;
      });

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
          id: 0,
          title: '',
          url: '/weather',
          icon: 'pin',
          lat: 0,
          lon: 0
        };
        newLoc.id = res.lat;
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
