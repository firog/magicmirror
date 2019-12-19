import React from 'react';
import styled from 'styled-components';
import WeatherContainer from './containers/WeatherContainer';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { colors } from './shared/colors';
import MainContainer from './client/MainContainer';

const Wrapper = styled.div`
  color: ${colors.black};
`;

const App = () => {
  const client = new ApolloClient({ uri: 'http://localhost:4000/' });
  return (
    <Wrapper>
      <ApolloProvider client={client}>
        <div className="App">
          <MainContainer client={client} />
        </div>
      </ApolloProvider>
    </Wrapper>
  );
};

export default App;
