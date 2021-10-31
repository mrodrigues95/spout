import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const useIsRedirecting = () => {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const start = () => setIsRedirecting(true);
    const done = () => setIsRedirecting(false);

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', done);
    router.events.on('routeChangeError', done);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', done);
      router.events.off('routeChangeError', done);
    };
  }, [router.events]);

  return isRedirecting;
};
