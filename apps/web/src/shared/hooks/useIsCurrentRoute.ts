import { useRouter } from 'next/router';

export const useIsCurrentRoute = (to: string[]) => {
  const router = useRouter();
  return to.includes(router.asPath || router.pathname);
};
