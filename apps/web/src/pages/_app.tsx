import { Suspense } from 'react';
import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { Toaster } from 'react-hot-toast';
import { RelayEnvironmentProvider } from 'react-relay';
import { NProgress } from '../shared/components';
import { useEnvironment } from '../shared/utils';
import 'cropperjs/dist/cropper.css';
import '../styles.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  // TODO: Properly hydrate the client.
  const environment = useEnvironment({});

  return (
    <Suspense fallback={null}>
      <RelayEnvironmentProvider environment={environment}>
        <DefaultSeo defaultTitle="Spout" titleTemplate="%s | Spout" />
        <Component {...pageProps} />
        <Toaster position="bottom-right" />
        <NProgress />
      </RelayEnvironmentProvider>
    </Suspense>
  );
};

export default MyApp;
