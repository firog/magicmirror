import { PointForecast } from './pointForecast';

export interface ForecastDay {
  day: string;
  weekDay: string;
  hours: PointForecast[];
}
