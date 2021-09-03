import { useEffect } from 'react';
import nprogress from 'nprogress';
import { useIsRedirecting } from '../../../hooks/useIsRedirecting';

const NProgress = () => {
  const isRedirecting = useIsRedirecting();

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

    if (isRedirecting) {
      start();
    } else {
      done();
    }

    return () => done();
  }, [isRedirecting]);

  return null;
};

export default NProgress;
