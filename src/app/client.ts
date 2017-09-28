import config from '../config';
import { ApolloClient, createNetworkInterface } from 'apollo-client';

const networkInterface = createNetworkInterface({
  uri: config.url
});
networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }
      if (localStorage.getItem('JWT_TOKEN')) {
        req.options.headers['Authorization'] = `${localStorage.getItem('JWT_TOKEN')}`;
      }
      next();
    }
  }
]);

const apolloClient = new ApolloClient({
  networkInterface
});

export function client(): ApolloClient {
  return apolloClient;
}
