import { gql } from 'apollo-server';

export default gql`
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
`;
