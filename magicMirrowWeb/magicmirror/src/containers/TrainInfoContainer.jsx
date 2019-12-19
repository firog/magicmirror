import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import TrainInfoTable from '../components/TrainInfoTable';

const TRAIN_INFO = gql`
  {
    lateTrains(fromStation: "U", endStation: "Cst") {
      departureTime
      departureStation
      arrivalStation
      nonStop
      track
    }
  }
`;

export default function TrainInfoContainer() {
  const { loading, error, data } = useQuery(TRAIN_INFO);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (data) {
    return <TrainInfoTable data={data} />;
  }
}
