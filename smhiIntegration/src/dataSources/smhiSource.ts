import { RESTDataSource } from 'apollo-datasource-rest';
import { PointForecasts, TimeSeries } from '../interfaces/pointForecasts';
import { PointForecast } from '../interfaces/pointForecast';
import { PrecipitationCategory } from '../enums/precipitationEnum';

export class SmhiApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL =
      'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/';
  }

  async getForecast(longitude: string, latitude: string, hour: string) {
    const response = (await this.get(
      `lon/${longitude}/lat/${latitude}/data.json`
    )) as PointForecasts;

    return this.forecastReducer(response, hour);
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

      const precipitationCategory = t.parameters.find(p => p.name === 'pcat')
        .values[0];

      result.push({
        longitude: foreCasts.geometry.coordinates[0][0],
        latitude: foreCasts.geometry.coordinates[0][1],
        temperature,
        windSpeed,
        time: t.validTime,
        precipitationCategory:
          PrecipitationCategory[parseInt(precipitationCategory)]
      } as PointForecast);
    });

    return result;
  }

  forecastReducer(foreCast: PointForecasts, hour: string) {
    const timeSeries = foreCast.timeSeries.find(t => {
      const validTime = new Date(t.validTime);
      return validTime.getHours() === parseInt(hour);
    });

    const temperature = this.getNamedParameter(timeSeries, 't', 'Cel');

    const windSpeed = this.getNamedParameter(timeSeries, 'ws', 'm/s');

    const precipitationCategory = this.getNamedParameter(timeSeries, 'pcat');

    return {
      longitude: foreCast.geometry.coordinates[0][0],
      latitude: foreCast.geometry.coordinates[0][1],
      temperature,
      windSpeed,
      time: timeSeries.validTime,
      precipitationCategory:
        PrecipitationCategory[parseInt(precipitationCategory)]
    };
  }

  getNamedParameter(
    timeSeries: TimeSeries,
    name: string = '',
    unit: string = ''
  ) {
    if (unit) {
      return timeSeries.parameters.find(t => t.name === name && t.unit === unit)
        .values[0];
    } else {
      return timeSeries.parameters.find(t => t.name === name).values[0];
    }
  }
}
