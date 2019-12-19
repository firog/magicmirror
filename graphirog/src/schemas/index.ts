import { gql } from 'apollo-server';

const typeDefs = gql`
  type LateTrains {
    lateTrain: [LateTrain]
  }

  type LateTrain {
    departureStation: String
    departureTime: String
    arrivalStation: String
    trainNumber: String
    productInfo: String
    nonStop: Boolean
    track: String
  }

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

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    dailyForecasts(longitude: String!, latitude: String!): [DailyForecast]
    lateTrains(fromStation: String, endStation: String): [LateTrain]
  }
`;

export default typeDefs;
