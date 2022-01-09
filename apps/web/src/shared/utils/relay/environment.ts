import {
  Network,
  Store,
  RecordSource,
  Environment,
  FetchFunction,
} from 'relay-runtime';
import { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes';

const getFetchFn = (headers: Record<string, any> = {}): FetchFunction => {
  return async (operation, variables, _cacheConfig, _uploadables) => {
    const fetchOpts: RequestInit = {
      method: 'POST',
      credentials: 'include',
      headers: {
        ...headers,
      },
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

    const res = await fetch('https://spout.dev/api/graphql', fetchOpts);

    return res.json();
  };
};

export const createEnvironment = (records?: RecordMap) => {
  return new Environment({
    // TODO: Pass in headers.
    network: Network.create(getFetchFn()),
    store: new Store(
      new RecordSource(records),
      // This property tells Relay to not immediately clear its cache when the user
      // navigates around the app. Relay will hold onto the specified number of
      // query results, allowing the user to return to recently visited pages
      // and reusing cached data if its available/fresh.
      { gcReleaseBufferSize: 10 }
    ),
  });
};
