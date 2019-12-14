import { gql } from 'apollo-server';

const typeDefs = gql`
  type LateTrains {
    lateTrain: [LateTrain]
  }

  type LateTrain {
    departureStation: String
    arrivalStation: String
    advertisedTimeAtLocation: String
    productInformation: String
    estimatedTimeAtLocation: String
    numberOfMinutesLate: Int

    # AdvertisedTimeAtLocation,
    #         trainInfo.AdvertisedTrainIdent,
    #         trainInfo.ProductInformation,
    #         trainInfo.EstimatedTimeAtLocation,
    #         numOfMinLate,
    #         trainInfo.FromLocation.LocationName,
    #         trainInfo.LocationSignature,
    #         (trainInfo.departureTime = await getDepartingTrainsInfo(
    #           trainInfo.FromLocation[0].LocationName,
    #           trainInfo.AdvertisedTrainIdent,
    #           new Date(trainInfo.AdvertisedTimeAtLocation)
    #         )),
    #         trainInfo.Canceled
  }

  type HourlyForecast {
    longitude: String
    latitude: String
    temperature: String
    windSpeed: String
    time: String
    precipitationCategory: Precipitation
  }

  type DailyForecast {
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
    lateTrains(fromStation: String, arrivalStation: String): [LateTrain]
  }
`;

export default typeDefs;
