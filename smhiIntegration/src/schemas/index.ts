import { gql } from 'apollo-server';

const typeDefs = gql`
  type PointForecast {
    longitude: String
    latitude: String
    temperature: String
    windSpeed: String
    time: String
    precipitationCategory: Precipitation
  }

  type PointForecasts {
    pointForecast: [PointForecast]
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
    pointForecast(
      longitude: String!
      latitude: String!
      hour: String!
    ): PointForecast
    pointForecasts(longitude: String!, latitude: String!): [PointForecast]
  }
`;

export default typeDefs;
