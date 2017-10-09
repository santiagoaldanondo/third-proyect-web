import config from '../config';
import { ApolloClient, createNetworkInterface } from 'apollo-client';

import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
const wsClient = new SubscriptionClient(config.wsUrl);

const networkInterface = createNetworkInterface({
  uri: config.apiUrl,
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
  networkInterface,
  dataIdFromObject: o => o["_id"]
});

export function apolloClient(): ApolloClient {
  return client;
}
