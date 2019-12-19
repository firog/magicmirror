import React from 'react';
import WeatherContainer from '../containers/WeatherContainer';
import TrainInfoContainer from '../containers/TrainInfoContainer';

export default function MainContainer({ client }) {
  return (
    <React.Fragment>
      <WeatherContainer client={client}></WeatherContainer>
      <TrainInfoContainer client={client}></TrainInfoContainer>
    </React.Fragment>
  );
}
