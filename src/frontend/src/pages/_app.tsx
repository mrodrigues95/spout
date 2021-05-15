import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { ApolloProvider } from '@apollo/client';
import { Toaster } from 'react-hot-toast';
import { useApollo } from '~/shared/utils/apollo';
import '~/css/styles.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const client = useApollo(pageProps.initialClientState);

  return (
    <ApolloProvider client={client}>
      <DefaultSeo defaultTitle="Spout" titleTemplate="%s | Spout" />
      <Component {...pageProps} />
      <Toaster position="bottom-right" />
    </ApolloProvider>
  );
};

export default MyApp;
