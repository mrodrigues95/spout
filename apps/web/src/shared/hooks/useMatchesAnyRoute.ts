import { useRouter } from 'next/router';

export const useMatchesAnyRoute = (to: string[]) => {
  const router = useRouter();
  return to.includes(router.asPath);
};
