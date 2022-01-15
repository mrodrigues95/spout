import { useMemo } from 'react';
import {
  Environment,
  FetchFunction,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';
import { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes';

type Headers = Record<string, any>;

const getFetchFn = (headers: Headers = {}): FetchFunction => {
  return async (operation, variables, _cacheConfig, _uploadables) => {

    const fetchOpts: RequestInit = {
      method: 'POST',
      credentials: 'include',
      headers,
    };

    const operationBody = {
      id: operation.id,
      query: operation.text,
      variables: variables,
    };

    Object.assign(fetchOpts, {
      headers: {
        ...fetchOpts.headers,
        'content-type': 'application/json',
      },
      body: JSON.stringify(operationBody),
    });

    const isServer = typeof window === 'undefined';
    const endpoint = isServer
      ? 'http://api:5000/api/graphql'
      : 'https://spout.dev/api/graphql';

    const res = await fetch(endpoint, fetchOpts);

    return res.json();
  };
};

export const createRelayEnvironment = (
  isServer = false,
  headers: Headers = {}
) => {
  // TODO: Pass in headers.
  const network = Network.create(getFetchFn(headers));
  const source = new RecordSource();
  const store = new Store(source, {
    // This property tells Relay to not immediately clear its cache when the user
    // navigates around the app. Relay will hold onto the specified number of
    // query results, allowing the user to return to recently visited pages
    // and reusing cached data if its available/fresh.
    gcReleaseBufferSize: 10,
  });

  return new Environment({ network, store, isServer });
};

let relayEnvironment: Environment | null;

// TODO: Enable strict mode.
export const initRelayEnvironment = (records?: RecordMap) => {
  // For SSG and SSR, always create a new Relay environment.
  const isServer = typeof window === 'undefined';
  if (isServer) return createRelayEnvironment(isServer);

  const environment = relayEnvironment ?? createRelayEnvironment(isServer);

  // Hydrate the client.
  if (records) environment.getStore().publish(new RecordSource(records));

  // Create the Relay environment once in the client.
  if (!relayEnvironment) relayEnvironment = environment;

  return relayEnvironment;
};

export const useEnvironment = (records?: RecordMap) => {
  const store = useMemo(() => initRelayEnvironment(records), [records]);
  return store;
};

export const resetEnvironment = () => {
  relayEnvironment = null;
};
