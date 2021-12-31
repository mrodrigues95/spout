import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { withIronSessionSsr } from 'iron-session/next';
import { resolveSession, sessionOptions } from './sessions';

const unauthRoute = async (
  ctx: GetServerSidePropsContext,
  redirect = '/home'
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
    },
  };
};

export const unauthenticatedRoute = withIronSessionSsr(
  unauthRoute,
  sessionOptions
);

const authRoute = async (
  ctx: GetServerSidePropsContext,
  redirect = '/auth/signup'
): Promise<GetServerSidePropsResult<Record<string, unknown>>> => {
  console.log('Ctx: ', ctx.req.session)
  const session = await resolveSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: `${redirect}?redirect=${encodeURIComponent(
          ctx.resolvedUrl
        )}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
    },
  };
};

export const authenticatedRoute = withIronSessionSsr(authRoute, sessionOptions);
