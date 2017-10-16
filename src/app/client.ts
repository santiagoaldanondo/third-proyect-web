import config from '../config';
import { ApolloClient, createNetworkInterface } from 'apollo-client';

import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
const wsClient = new SubscriptionClient(config.wsUrl, {
  reconnect: true,
  connectionParams: {
    authToken: localStorage.getItem("JWT_TOKEN"),
  }
});


// const networkInterface = createBatchingNetworkInterface({
//   batchInterval: 10,
const networkInterface = createNetworkInterface({
  uri: config.apiUrl,
  // opts: {
  //   credentials: 'same-origin',
  // },
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
);

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

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  dataIdFromObject: o => o["_id"]
});

export function apolloClient(): ApolloClient {
  return client;
}
