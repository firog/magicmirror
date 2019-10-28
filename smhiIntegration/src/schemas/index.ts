import { gql } from 'apollo-server';

const typeDefs = gql`
  type PointForecast {
    longitude: String
    latitude: String
    temperature: String
    windSpeed: String
    time: String
  }

  type PointForecasts {
    pointForecast: [PointForecast]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    pointForecast(longitude: String!, latitude: String!): PointForecast
    pointForecasts(longitude: String!, latitude: String!): [PointForecast]
  }
`;

export default typeDefs;
