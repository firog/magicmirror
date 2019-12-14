import { PointForecast } from './pointForecast';

export interface ForecastDay {
  day: string;
  hours: PointForecast[];
}
