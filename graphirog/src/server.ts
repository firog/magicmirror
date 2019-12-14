import { ApolloServer } from 'apollo-server';
import typeDefs from './schemas/index';
import resolvers from './resolvers/index';
import integrations from './dataSources';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      smhiApi: new integrations.SmhiApi(),
      trafikverketApi: new integrations.TrafikverketApi()
    };
  }
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => console.log('Module disposed. '));
}
