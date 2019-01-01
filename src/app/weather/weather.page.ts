import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { LoadingController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CurrentLoc } from '../current-loc';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})

export class WeatherPage implements OnInit {
  theWeather: any = {};
  currentData: any = {};
  day1: any = {};
  day2: any = {};
  day3: any = {};
  loading: any;
  currentLoc: CurrentLoc = { lat: 0, lon: 0 };
  pageTitle: string;

  constructor(public weatherService: WeatherService,
    public loadingController: LoadingController,
    private geolocation: Geolocation,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.presentLoading();
    const options = {
      enableHighAccuracy: true, timeout: 60000, maximumAge: 0
    };

    if (+this.route.snapshot.paramMap.get('id') === 0) {
      this.pageTitle = 'Current Location';
      this.geolocation.getCurrentPosition(options).then(pos => {
        this.currentLoc.lat = pos.coords.latitude;
        this.currentLoc.lon = pos.coords.longitude;
        this.currentLoc.timestamp = pos.timestamp;
        console.log(this.currentLoc);
        return this.currentLoc;
      })
        .then(currentLoc => {
          this.getLocationWeather(currentLoc);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.route.queryParams.subscribe(params => {
        this.currentLoc.lat = Number(params.lat);
        this.currentLoc.lon = Number(params.lon);
        this.pageTitle = params.title;
        this.getLocationWeather(this.currentLoc);
      });
    }
  }

  getLocationWeather(currentLoc: CurrentLoc) {
    console.log('getLocationWeather');
    this.weatherService.getWeather(currentLoc).subscribe((data) => {
      this.theWeather = data;
      this.currentData = this.theWeather.currently;
      this.day1 = this.theWeather.daily.data[0];
      this.day2 = this.theWeather.daily.data[1];
      this.day3 = this.theWeather.daily.data[2];
      this.loading.dismiss();
      console.log(this.loading);
    });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Loading weather data...'
    });
    return await this.loading.present();
  }

  doRefresh(event) {
    this.weatherService.getWeather(this.currentLoc, true).subscribe((data) => {
      this.theWeather = data;
      this.currentData = this.theWeather.currently;
      this.day1 = this.theWeather.daily.data[0];
      this.day2 = this.theWeather.daily.data[1];
      this.day3 = this.theWeather.daily.data[2];
      event.target.complete();
    });
  }

}
