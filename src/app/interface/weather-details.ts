import { TemperatureDetails } from './temperature-details';

/* eslint-disable @typescript-eslint/naming-convention */
export interface WeatherDetails {
  EpochTime: number;
  HasPrecipitation: boolean;
  IsDayTime: false;
  Link: string;
  LocalObservationDateTime: string;
  Temperature: TemperatureDetails;
  WeatherIcon: number;
  WeatherText: string;
}
