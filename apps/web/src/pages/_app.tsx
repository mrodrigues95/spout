import { Suspense, useMemo } from 'react';
import { RelayEnvironmentProvider } from 'react-relay';
import { SSRProvider } from '@react-aria/ssr';
import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { Toaster } from 'react-hot-toast';
import { NProgress, SessionProvider } from '../shared/components';
import { useEnvironment } from '../shared/utils';

import 'react-datepicker/dist/react-datepicker.css';
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
    <>
      <DefaultSeo defaultTitle="Spout" titleTemplate="%s | Spout" />
      <RelayEnvironmentProvider environment={environment}>
        <Suspense fallback={null}>
          <SessionProvider sessionId={pageProps.sessionId}>
            <SSRProvider>
              <Component {...pageProps} />
            </SSRProvider>
          </SessionProvider>
        </Suspense>
        <Toaster
          position="bottom-center"
          toastOptions={{ duration: 4000, className: 'font-medium' }}
        />
        <NProgress />
      </RelayEnvironmentProvider>
    </>
  );
};

export default MyApp;
