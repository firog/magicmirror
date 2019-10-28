import { RESTDataSource } from 'apollo-datasource-rest';
import { PointForecasts } from '../interfaces/pointForecasts';
import { PointForecast } from '../interfaces/pointForecast';

export class SmhiApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL =
      'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/';
  }

  async getForecast(longitude: string, latitude: string, time: string) {
    const response = (await this.get(
      `lon/${longitude}/lat/${latitude}/data.json`
    )) as PointForecasts;

    return this.forecastReducer(response, new Date());
  }

  async getAllForecasts(longitude: string, latitude: string) {
    const response = (await this.get(
      `lon/${longitude}/lat/${latitude}/data.json`
    )) as PointForecasts;

    return this.allForecastsReducer(response);
  }

  allForecastsReducer(foreCasts: PointForecasts) {
    let result = [] as PointForecast[];
    foreCasts.timeSeries.map(t => {
      const temperature = t.parameters.find(
        p => p.name === 't' && p.unit === 'Cel'
      ).values[0];

      const windSpeed = t.parameters.find(
        p => p.name === 'ws' && p.unit === 'm/s'
      ).values[0];

      result.push({
        longitude: foreCasts.geometry.coordinates[0][0],
        latitude: foreCasts.geometry.coordinates[0][1],
        temperature,
        windSpeed,
        time: t.validTime
      } as PointForecast);
    });

    return result;
  }

  forecastReducer(foreCast: PointForecasts, time: Date) {
    const timeSeries = foreCast.timeSeries.find(t => {
      const validTime = new Date(t.validTime);
      return (
        validTime.getHours() === time.getHours() &&
        validTime.getDate() === time.getDate() &&
        validTime.getMonth() === time.getMonth()
      );
    });

    const temperature = timeSeries.parameters.find(
      t => t.name === 't' && t.unit === 'Cel'
    ).values[0];

    const windSpeed = timeSeries.parameters.find(
      t => t.name === 'ws' && t.unit === 'm/s'
    ).values[0];

    return {
      longitude: foreCast.geometry.coordinates[0][0],
      latitude: foreCast.geometry.coordinates[0][1],
      temperature,
      windSpeed
    };
  }
}
