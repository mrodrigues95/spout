import { Suspense, useMemo } from 'react';
import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { Toaster } from 'react-hot-toast';
import { RelayEnvironmentProvider } from 'react-relay';
import { NProgress, SessionProvider } from '../shared/components';
import { useEnvironment } from '../shared/utils';
import 'cropperjs/dist/cropper.css';
import '../styles.css';

export interface MyPageProps {
  shouldResetEnv: boolean;
  sessionId?: string;
}

interface MyAppProps extends AppProps<MyPageProps> {
  pageProps: MyPageProps;
}

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  // TODO: Properly hydrate the client when fetching on the server.
  // See: https://github.com/vercel/next.js/blob/canary/examples/with-relay-modern/pages/index.js
  const { records, shouldResetEnv } = useMemo(
    () => ({ records: {}, shouldResetEnv: pageProps.shouldResetEnv }),
    [pageProps.shouldResetEnv],
  );

  const environment = useEnvironment(records, shouldResetEnv);

  return (
    <Suspense fallback={null}>
      <DefaultSeo defaultTitle="Spout" titleTemplate="%s | Spout" />
      <RelayEnvironmentProvider environment={environment}>
        <SessionProvider sessionId={pageProps.sessionId}>
          <Component {...pageProps} />
        </SessionProvider>
      </RelayEnvironmentProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{ duration: 4000, className: 'font-medium' }}
      />
      <NProgress />
    </Suspense>
  );
};

export default MyApp;
