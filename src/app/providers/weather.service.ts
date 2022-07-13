/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { WeatherDetails } from '../interface/weather-details';
import { FiveDaysWeatherData } from '../interface/five-days-weather-data';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  locationBaseLink = 'https://dataservice.accuweather.com/locations/v1/cities/search';
  currentWeatherBaseLink = 'https://dataservice.accuweather.com/currentconditions/v1';
  fiveDaysWeatherBaseLink = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day';
  apikey = 'XKAm8FPn7Ptx9O2JVE9GWPAbhwCkkYLL';

  mapBoxApiBaseLink = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
  mapbox_apikey = 'pk.eyJ1IjoiZmFyaGFuLXRhcmlxLTEyYiIsImEiOiJjbDVqdWtuMjUwM3JxM2tvNHRlNDUyeHJ2In0.jt8QHDByJkSka53UOqzkjA';

  openWeatherMapBaseLink = 'https://api.openweathermap.org/data/2.5/weather';
  apikey_openWeather = '7457e3238f7dede8ccae113c6f24e6f8';

  constructor(
    private http: HttpClient
  ) {}

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occured', error.error.message);
    }
    else {
      console.error(`Backend return this code ${error.status}` + `body was : ${error.error}`);
    }
    return throwError('Something bad Happend ! Try Again');
  }

  public gettingLocation(locationName) {
    const params = `?apikey=${this.apikey}&q=${locationName}`;
    return this.http
      .get<any>(this.locationBaseLink + params)
      .pipe(retry(1), catchError(this.handleError));
  }

  public gettingWeather(id): Observable<WeatherDetails>{
    const params = `/${id}?apikey=${this.apikey}`;
    return this.http
      .get<WeatherDetails>(this.currentWeatherBaseLink+params)
      .pipe(retry(1), catchError(this.handleError));
  }
  public fiveDaysWeather(id): Observable<FiveDaysWeatherData> {
    const params = `/${id}?apikey=${this.apikey}`;
    return this.http
      .get<FiveDaysWeatherData>(this.fiveDaysWeatherBaseLink + params)
      .pipe(retry(1), catchError(this.handleError));
  }

  public gettingLatLong(city) {
    const params = `/${city}.json?access_token=${this.mapbox_apikey}`;
    return this.http
      .get<any>(this.mapBoxApiBaseLink + params)
      .pipe(retry(1), catchError(this.handleError));
  }

  public gettingHumidityAndPressure(lat, long) {
    const params = `?lat=${lat}&lon=${long}&appid=${this.apikey_openWeather}`;
    return this.http
      .get<any>(this.openWeatherMapBaseLink + params)
      .pipe(retry(1), catchError(this.handleError));
  }
}
