import { useRouter } from 'next/router';
import { useCallback } from 'react';

export const useAuthRedirect = () => {
  const router = useRouter();

  // TODO: Reset relay env.
  return useCallback(() => {
    router.push((router.query.redirect as string) ?? '/home');
  }, [router]);
};
