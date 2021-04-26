import { AppProps } from 'next/app';
import '../styles.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default MyApp;
