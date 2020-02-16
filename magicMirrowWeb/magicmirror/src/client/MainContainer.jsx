import React from 'react';
import WeatherContainer from '../containers/WeatherContainer';
import TrainInfoContainer from '../containers/TrainInfoContainer';
import TrainAnnouncmentsContainer from '../containers/TrainAnnouncmentsContainer';

export default function MainContainer({ client }) {
  return (
    <React.Fragment>
      <WeatherContainer client={client}></WeatherContainer>
      <TrainInfoContainer client={client}></TrainInfoContainer>
      <TrainAnnouncmentsContainer client={client}></TrainAnnouncmentsContainer>
    </React.Fragment>
  );
}
