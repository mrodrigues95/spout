import { Suspense, useMemo } from 'react';
import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { Toaster } from 'react-hot-toast';
import { RelayEnvironmentProvider } from 'react-relay';
import { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes';
import { NProgress } from '../shared/components';
import { createEnvironment } from '../shared/utils';
import 'cropperjs/dist/cropper.css';
import '../styles.css';

interface Props {
  records?: RecordMap;
}

const MyApp = ({ Component, pageProps, records: r }: AppProps & Props) => {
  const records: RecordMap = useMemo(() => {
    if (r) return r;

    if (typeof document !== 'undefined') {
      const recordsData = document.getElementById('relay-data')?.innerHTML;
      if (recordsData) {
        return JSON.parse(Buffer.from(recordsData, 'base64').toString());
      }
    }

    return {};
  }, [r]);

  console.log(records);

  return (
    <Suspense fallback={null}>
      <RelayEnvironmentProvider environment={createEnvironment(records)}>
        <DefaultSeo defaultTitle="Spout" titleTemplate="%s | Spout" />
        <Component {...pageProps} />
        <Toaster position="bottom-right" />
        <NProgress />
      </RelayEnvironmentProvider>
    </Suspense>
  );
};

export default MyApp;
