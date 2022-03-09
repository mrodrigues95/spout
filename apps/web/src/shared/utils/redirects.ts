import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { MyPageProps } from '../../pages/_app';
import { resolveSession } from './sessions';

export const unauthenticatedRoute = async (
  ctx: GetServerSidePropsContext,
  redirect = '/home',
): Promise<GetServerSidePropsResult<MyPageProps>> => {
  const session = await resolveSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: redirect,
        permanent: false,
      },
    };
  }

  return {
    props: {
      shouldResetEnv: true,
    },
  };
};

export const authenticatedRoute = async (
  ctx: GetServerSidePropsContext,
  redirect = '/auth/signup',
): Promise<GetServerSidePropsResult<MyPageProps>> => {
  const session = await resolveSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: `${redirect}?redirect=${encodeURIComponent(
          ctx.resolvedUrl,
        )}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      shouldResetEnv: false,
      sessionId: session.id,
    },
  };
};
