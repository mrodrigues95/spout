import { useRouter } from 'next/router';
import { useCallback } from 'react';

export const useAuthRedirect = () => {
  const router = useRouter();

  return useCallback(() => {
    router.push((router.query.redirect as string) ?? '/home');
  }, [router]);
};
