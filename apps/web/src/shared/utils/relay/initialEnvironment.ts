import 'regenerator-runtime/runtime';
import { Store, RecordSource, Environment } from 'relay-runtime';
import { RelayNetworkLayer, urlMiddleware } from 'react-relay-network-modern';
import RelayServerSSR from 'react-relay-network-modern-ssr/lib/server';

export const createInitialEnvironment = (relayServerSSR: RelayServerSSR) => {
  const network = new RelayNetworkLayer([
    relayServerSSR.getMiddleware(),
    urlMiddleware({
      url: 'http://api:5000/api/graphql',
      credentials: 'include',
    }),
  ]);

  return new Environment({
    network,
    store: new Store(new RecordSource()),
  });
};
