import React from 'react';
import WeatherContainer from '../containers/WeatherContainer';
import TrainInfoContainer from '../containers/TrainInfoContainer';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function MainContainer({ client }) {
  return (
    <Wrapper>
      <WeatherContainer client={client}></WeatherContainer>
      <TrainInfoContainer client={client}></TrainInfoContainer>
    </Wrapper>
  );
}
