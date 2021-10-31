import { useMemo } from 'react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import {
  ApolloClient,
  from,
  InMemoryCache,
  QueryOptions,
  split,
} from '@apollo/client';
import {
  getMainDefinition,
  relayStylePagination,
} from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from '@apollo/client/link/error';
import { createWSLink } from './websockets';

let apolloClient: ApolloClient<any>;

interface ClientOptions {
  headers?: Record<string, string>;
  initialState?: Record<string, any>;
}

export const preloadQuery = async (
  context: GetServerSidePropsContext,
  ...queries: QueryOptions[]
): Promise<GetServerSidePropsResult<{}>> => {
  const client = createApolloClient({
    headers: context.req.headers as Record<string, string>,
  });

  try {
    await Promise.all(
      queries.map((queryOptions) => client.query(queryOptions)),
    );

    return {
      props: {
        initialClientState: client.cache.extract(),
      },
    };
  } catch (e: any) {
    const notFoundError = e.graphQLErrors.find(
      (error: Error) => (error as any)?.extensions.code === 404,
    );

    if (notFoundError) {
      return {
        notFound: true,
      };
    }

    return { props: {} };
  }
};

export const useApollo = (initialState?: Record<string, any>) => {
  const client = useMemo(
    () => createApolloClient({ initialState }),
    [initialState],
  );

  return client;
};

export const createApolloClient = ({
  initialState,
  headers,
}: ClientOptions) => {
  const ssrMode = typeof window === 'undefined';
  let nextClient = apolloClient;

  // NOTE: With `apollo-upload-client`, only one terminating link can be registered
  // which means we need to use `createUploadLink` instead of `httpLink`.
  const uploadLink = createUploadLink({
    // When running in Docker, we need to expose the graphql endpoint
    // to the browser environment outside of Docker for SSR and client requests.
    // See: https://github.com/apollographql/apollo-link/issues/375
    uri: ssrMode
      ? 'http://api:5000/api/graphql'
      : 'http://spout.local/api/graphql',
    headers: headers,
    credentials: 'include',
  });

  // Websocket link can only be instantiated on the client side.
  const splitLink = ssrMode
    ? uploadLink
    : split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        createWSLink(),
        uploadLink,
      );

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    }

    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  if (!nextClient) {
    nextClient = new ApolloClient({
      ssrMode,
      link: from([errorLink, splitLink]),
      cache: new InMemoryCache({
        typePolicies: {
          Discussion: {
            fields: {
              messages: relayStylePagination(),
            },
          },
        },
      }),
    });
  }

  if (initialState) {
    const existingCache = nextClient.extract();
    nextClient.cache.restore({ ...existingCache, ...initialState });
  }

  if (ssrMode) return nextClient;
  if (!apolloClient) apolloClient = nextClient;

  return nextClient;
};
