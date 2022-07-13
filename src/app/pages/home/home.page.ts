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
  dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
  secondTomorrow: number;
  thirdTomorrrow: number;
  todaySign: string;
  secondTomorrowSign: string;
  thirdTomorrowSign: string;
  tomorrowDay: string;
  secondTomorrowDay: string;
  thirdTomorrowDay: string;
  latLong: Array<number>;
  lat: number;
  lang: number;
  humidity: number;
  pressure: number;
  constructor(
    private weather: WeatherService,
    private loadController: LoadingController,
  ) {}

 async ngOnInit(){
  await this.gettingLocation(this.cityName);
 }
  gettingValue(event) {
    this.cityName = event.detail.value;
    this.gettingLocation(this.cityName);
    if(this.cityName === '') {
      this.cityName = 'Lahore';
      this.gettingLocation(this.cityName);
    }
  }

  async gettingLocation(locationName) {
    this.weather.gettingLocation(locationName).subscribe(res => {
      this.locationId = res[0].Key;
      this.cityName = res[0].EnglishName;
      this.countryName = res[0].Country.EnglishName;
      this.gettingWeatherData(this.locationId);
      this.fiveDaysWeatherData(this.locationId);
      this.gettingLoctionCordinates(this.cityName);
    });
  }

  async gettingWeatherData(id) {
      this.weather.gettingWeather(id).subscribe(res=> {
        this.temperature = res[0].Temperature.Metric.Value;
        if(this.temperature > 0) {
          this.todaySign = '+';
        }
        else {
          this.todaySign = '-';
        }
        this.weatherImage = res[0].WeatherIcon;
        const date = new Date(res[0].LocalObservationDateTime);
        const month = date.toLocaleString('default', { month: 'long' });
        const day = this.dayNames[date.getDay()-1];
        this.gettingDate = day + ',' + date.getDate() + ' ' + month;
      });
  }

  async fiveDaysWeatherData(id) {
    this.weather.fiveDaysWeather(id).subscribe(res=> {
      const firstDate = new Date(res.DailyForecasts[0].Date);
      const firstDay = this.dayNames[firstDate.getDay()-1];
      this.tomorrowDay = firstDay;
      const secondDate = new Date(res.DailyForecasts[1].Date);
      const secondDay = this.dayNames[secondDate.getDay()-1];
      this.secondTomorrowDay = secondDay;
      const thirdDate = new Date(res.DailyForecasts[2].Date);
      const thirdDay = this.dayNames[thirdDate.getDay()-1];
      this.thirdTomorrowDay = thirdDay;
      const second = res.DailyForecasts[1].Temperature.Maximum.Value;
      const third = res.DailyForecasts[2].Temperature.Maximum.Value;
      this.secondTomorrow = (second - 32 ) * 5 / 9;
      if(this.secondTomorrow > 0) {
        this.secondTomorrowSign = '+';
      }
      else {
        this.secondTomorrowSign = '-';
      }
      this.thirdTomorrrow = (third - 32 ) * 5 / 9;
      if(this.thirdTomorrrow > 0) {
        this.thirdTomorrowSign = '+';
      }
      else {
        this.thirdTomorrowSign = '-';
      }
    });
  }

  async gettingLoctionCordinates(city) {
    this.weather.gettingLatLong(city).subscribe(res => {
      this.latLong = res.features[0].geometry.coordinates;
      this.lat = this.latLong[0];
      this.lang = this.latLong[1];
      this.gettingHumAndPress(this.lat, this.lang);
    });
  }

  async gettingHumAndPress(lat, long) {
    this.weather.gettingHumidityAndPressure(lat,long).subscribe(res => {
      this.humidity = res.main.humidity;
      this.pressure = res.main.pressure;
    });
  }
}
