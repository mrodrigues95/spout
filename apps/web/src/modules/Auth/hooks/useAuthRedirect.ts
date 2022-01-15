import { useRouter } from 'next/router';

export const useAuthRedirect = () => {
  const router = useRouter();

  return () => {
    // TODO: Reset Relay env.
    router.push((router.query.redirect as string) ?? '/home');
  };
};
