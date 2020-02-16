import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import StationInfo from '../components/StationInfo';

const STATION_ANNOUNCEMENT = gql`
  {
    stationAnnouncement(station: "U") {
      reasonCodeText
      startDateTime
      lastUpdatedDateTime
      description
    }
  }
`;

export default function TrainAnnouncmentsContainer() {
  const { loading, error, data } = useQuery(STATION_ANNOUNCEMENT, {
    pollInterval: 1000 * 60 * 30
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (data) {
    return <StationInfo data={data} />;
  }
}
