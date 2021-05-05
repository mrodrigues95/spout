import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '~/shared/utils/apollo';
import '~/css/styles.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const client = useApollo(pageProps.initialClientState);

  return (
    <ApolloProvider client={client}>
      <DefaultSeo defaultTitle="Spout" titleTemplate="%s | Spout" />
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
