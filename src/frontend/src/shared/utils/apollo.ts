import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  QueryOptions,
} from '@apollo/client';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useMemo } from 'react';

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

export const createApolloClient = ({ initialState, headers }: ClientOptions) => {
  let nextClient = apolloClient;

  if (!nextClient) {
    nextClient = new ApolloClient({
      ssrMode: typeof window === 'undefined',
      link: new HttpLink({
        uri: 'http://localhost:5000/graphql/',
        headers: headers,
        credentials: 'include',
      }),
      cache: new InMemoryCache(),
    });
  }

  if (initialState) {
    const existingCache = nextClient.extract();
    nextClient.cache.restore({ ...existingCache, ...initialState });
  }

  if (typeof window === 'undefined') return nextClient;
  if (!apolloClient) apolloClient = nextClient;

  return nextClient;
};
