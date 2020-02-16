import { gql } from 'apollo-server';

export default gql`
  type HourlyForecast {
    weekDay: String
    longitude: String
    latitude: String
    temperature: String
    windSpeed: String
    time: String
    precipitationCategory: Precipitation
    weatherSymbol: Int
  }

  type DailyForecast {
    weekDay: String
    day: String
    hours: [HourlyForecast]
  }

  enum Precipitation {
    NONE
    SNOW
    SNOWRAIN
    RAIN
    DRIZZLE
    FREEZINGRAIN
    FREEZINGDRIZZLE
  }
`;
