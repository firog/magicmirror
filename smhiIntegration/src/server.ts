import { ApolloServer } from 'apollo-server';
import typeDefs from './schemas/index';
import resolvers from './resolvers/index';
import SmhiApi from './dataSources/index';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      smhiApi: new SmhiApi()
    };
  }
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
