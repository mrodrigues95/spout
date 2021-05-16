import { useEffect } from 'react';
import { useRouter } from 'next/router';
import nprogress from 'nprogress';

const NProgress = () => {
  const router = useRouter();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const start = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => nprogress.start(), 100);
    };

    const done = () => {
      clearTimeout(timeout);
      nprogress.done();
    };

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', done);
    router.events.on('routeChangeError', done);
    return () => {
      done();
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', done);
      router.events.off('routeChangeError', done);
    };
  }, []);

  return null;
};

export default NProgress;
