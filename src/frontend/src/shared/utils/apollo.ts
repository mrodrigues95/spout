import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  QueryOptions,
  split,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import {
  getMainDefinition,
  relayStylePagination,
} from '@apollo/client/utilities';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useMemo } from 'react';
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
      queries.map((queryOptions) => client.query(queryOptions))
    );

    return {
      props: {
        initialClientState: client.cache.extract(),
      },
    };
  } catch (e) {
    const notFoundError = e.graphQLErrors.find(
      (error: Error) => (error as any)?.extensions.code === 404
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
  const client = useMemo(() => createApolloClient({ initialState }), [
    initialState,
  ]);

  return client;
};

export const createApolloClient = ({
  initialState,
  headers,
}: ClientOptions) => {
  const ssrMode = typeof window === 'undefined';
  let nextClient = apolloClient;

  const httpLink = new HttpLink({
    // When running in Docker, we need to expose the graphql endpoint
    // to the browser environment outside of Docker for SSR and client requests.
    // See: https://github.com/apollographql/apollo-link/issues/375
    uri: ssrMode
      ? 'http://backend:5000/graphql'
      : 'http://spout.localhost/graphql',
    headers: headers,
    credentials: 'include',
  });

  // Websocket link can only be instantiated on the client side.
  const splitLink = ssrMode
    ? httpLink
    : split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        createWSLink(),
        httpLink
      );

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
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
              messages: relayStylePagination()
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
