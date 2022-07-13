/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { WeatherDetails } from '../interface/weather-details';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  locationBaseLink = 'https://dataservice.accuweather.com/locations/v1/cities/search';
  currentWeatherBaseLink = 'https://dataservice.accuweather.com/currentconditions/v1';
  apikey = 'RPo8nnv6FkOHxOQQcm8CHKqsACUkWI8U';
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

}
