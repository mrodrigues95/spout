import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { withIronSessionSsr } from 'iron-session/next';
import { resolveSession, SESSION_OPTIONS } from './sessions';

const unauthRoute = async (
  ctx: GetServerSidePropsContext,
  redirect = '/home',
) => {
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

export const unauthenticatedRoute = withIronSessionSsr(
  unauthRoute,
  SESSION_OPTIONS,
);

const authRoute = async (
  ctx: GetServerSidePropsContext,
  redirect = '/auth/signup',
): Promise<GetServerSidePropsResult<Record<string, unknown>>> => {
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
    },
  };
};

export const authenticatedRoute = withIronSessionSsr(
  authRoute,
  SESSION_OPTIONS,
);
