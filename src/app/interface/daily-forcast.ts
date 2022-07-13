import { Day } from './day';
import { TemperatureMinMax } from './temperature-min-max';

/* eslint-disable @typescript-eslint/naming-convention */
export interface DailyForecasts {
  Date: string;
  Day: Day;
  Night: Day;
  Temperature: TemperatureMinMax;
}
