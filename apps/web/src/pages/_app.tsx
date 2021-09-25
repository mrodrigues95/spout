import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { ApolloProvider } from '@apollo/client';
import { Toaster } from 'react-hot-toast';
import { useApollo } from '../shared/utils/apollo';
import { NProgress } from '../shared/components';
import '../styles.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const client = useApollo(pageProps.initialClientState);

  return (
    <ApolloProvider client={client}>
      <DefaultSeo defaultTitle="Spout" titleTemplate="%s | Spout" />
      <Component {...pageProps} />
      <Toaster position="bottom-right" />
      <NProgress />
    </ApolloProvider>
  );
};

export default MyApp;
