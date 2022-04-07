import { useMemo } from 'react';
import {
  Environment,
  FetchFunction,
  GraphQLResponse,
  Network,
  Observable,
  RecordSource,
  Store,
  SubscribeFunction,
} from 'relay-runtime';
import { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes';
import { SubscriptionClient } from 'subscriptions-transport-ws';

type Headers = Record<string, any>;

const getFetchFn = (headers: Headers = {}): FetchFunction => {
  return async (operation, variables) => {
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

const getSubscribeFn = (): SubscribeFunction => {
  return (request, variables) => {
    const subscriptionClient = new SubscriptionClient(
      'wss://spout.dev/api/graphql',
      {
        reconnect: true,
        lazy: true,
      },
    );

    const subscribeObservable = subscriptionClient.request({
      query: request.text ?? undefined,
      operationName: request.name,
      variables,
    });

    // @ts-ignore: TODO: Figure out these types.
    return Observable.from<GraphQLResponse>(subscribeObservable);
  };
};

export const createRelayEnvironment = (
  isServer = false,
  headers: Headers = {},
) => {
  // TODO: Pass in headers.
  const network = Network.create(getFetchFn(headers), getSubscribeFn());
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
const initRelayEnvironment = (
  records?: RecordMap,
  shouldResetEnv?: boolean,
) => {
  // For SSG and SSR, always create a new Relay environment.
  const isServer = typeof window === 'undefined';
  if (isServer) return createRelayEnvironment(isServer);

  // This will reset when the user logs in/out.
  if (shouldResetEnv || !relayEnvironment) {
    relayEnvironment = createRelayEnvironment();
  }

  // Hydrate the client.
  if (records) relayEnvironment.getStore().publish(new RecordSource(records));

  return relayEnvironment;
};

export const useEnvironment = (
  records?: RecordMap,
  shouldResetEnv?: boolean,
) => {
  const store = useMemo(
    () => initRelayEnvironment(records, shouldResetEnv),
    [records, shouldResetEnv],
  );
  return store;
};
