import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WeatherPage } from './weather.page';
import { WeatherIconPipe } from '../pipes/weather-icon.pipe';

const routes: Routes = [
  {
    path: '',
    component: WeatherPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WeatherPage, WeatherIconPipe]
})
export class WeatherPageModule {}
