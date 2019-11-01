import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import WeatherTable from '../components/WeatherTable';

const WEATHER_REPORTS = gql`
  {
    pointForecasts(longitude: "17.6389", latitude: "59.8586") {
      time
      longitude
      latitude
      temperature
      windSpeed
      precipitationCategory
    }
  }
`;

export default function WeatherContainer() {
  const { loading, error, data } = useQuery(WEATHER_REPORTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <WeatherTable data={data} />;
}
