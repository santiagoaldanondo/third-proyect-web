import config from '../config';
import { ApolloClient, createNetworkInterface } from 'apollo-client';

import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
const wsClient = new SubscriptionClient('ws://localhost:8080');

const networkInterface = createNetworkInterface({
  uri: config.url,
  opts: {
    credentials: 'same-origin',
  },
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

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
);

const client = new ApolloClient({
  networkInterface
});

export function apolloClient(): ApolloClient {
  return client;
}
