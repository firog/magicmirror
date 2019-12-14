import { RESTDataSource } from 'apollo-datasource-rest';
import { PointForecasts, TimeSeries } from '../../interfaces/pointForecasts';
import { forecastReducer, allForecastsReducer } from './mappers/forecastMapper';

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

    return forecastReducer(response, hour);
  }

  async getAllForecasts(longitude: string, latitude: string) {
    const response = (await this.get(
      `lon/${longitude}/lat/${latitude}/data.json`
    )) as PointForecasts;

    return allForecastsReducer(response);
  }
}
