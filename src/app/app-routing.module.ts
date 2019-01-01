import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'weather/0',
    pathMatch: 'full'
  },
  { path: 'weather/:id', loadChildren: './weather/weather.module#WeatherPageModule' },
  { path: 'locations/:id', loadChildren: './locations/locations.module#LocationsPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

