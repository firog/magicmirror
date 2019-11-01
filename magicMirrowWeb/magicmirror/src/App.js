import React from 'react';
import WeatherContainer from './containers/WeatherContainer';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const App = () => {
  const client = new ApolloClient({ uri: 'http://localhost:4000/' });
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h3>Weatherdata</h3>
        <WeatherContainer client={client} />
      </div>
    </ApolloProvider>
  );
};

export default App;
