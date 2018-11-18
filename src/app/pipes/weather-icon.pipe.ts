import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'weatherIcon'
})
export class WeatherIconPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let newIcon: String = 'sunny';
    const forecastNames: Array<string> = ['clear-day', 'clear-night', 'rain',
      'snow', 'sleet', 'wind', 'fog', 'cloudy', 'partly-cloudy-day', 'partly-cloudy-night'];
    const ioniconNames: Array<string> =
      ['sunny', 'moon', 'rainy', 'snow', 'snow', 'cloudy', 'cloudy', 'cloudy', 'partly-sunny', 'cloudy-night'];
    const iconIndex: number = forecastNames.indexOf(value);
    if (iconIndex !== -1) {
      newIcon = ioniconNames[iconIndex];
    }
    return newIcon;
  }
}
