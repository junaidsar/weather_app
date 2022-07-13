/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { WeatherService } from '../../providers/weather.service';
import { OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('cityInput') cityInput: ElementRef;
  locationId: object;
  temperature: number;
  cityName = 'Lahore';
  countryName = 'Pakistan';
  weatherImage: number;
  gettingDate: string;
  constructor(
    private weather: WeatherService,
    private loadController: LoadingController,
  ) {}

 async ngOnInit(){
  await this.gettingLocation(this.cityName);
 }
  gettingValue(event) {
    console.log(event);
    this.cityName = event.detail.value;
    this.gettingLocation(this.cityName);
    if(this.cityName === '') {
      this.cityName = 'Lahore';
      this.gettingLocation(this.cityName);
    }
  }

  async gettingLocation(locationName) {
    this.weather.gettingLocation(locationName).subscribe(res => {
      console.log(res);
      this.locationId = res[0].Key;
      this.cityName = res[0].EnglishName;
      this.countryName = res[0].Country.EnglishName;
      this.gettingWeatherData(this.locationId);
    });
  }

  async gettingWeatherData(id) {
      this.weather.gettingWeather(id).subscribe(res=> {
        this.temperature = res[0].Temperature.Metric.Value;
        this.weatherImage = res[0].WeatherIcon;
        const date = new Date(res[0].LocalObservationDateTime);
        const month = date.toLocaleString('default', { month: 'long' });
        const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
        const day = dayNames[date.getDay()-1];
        this.gettingDate = day + ',' + date.getDate() + ' ' + month;
      });
  }
}
