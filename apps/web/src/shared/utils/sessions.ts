import { Environment, fetchQuery, graphql, commitMutation } from 'react-relay';
import { IncomingMessage } from 'http';
import { GetServerSidePropsContext } from 'next';
import { IronSessionOptions } from 'iron-session';
import { differenceInSeconds } from 'date-fns';
import { createRelayEnvironment } from './relay';
import { sessionsQuery } from './__generated__/sessionsQuery.graphql';
import { sessionsMutation } from './__generated__/sessionsMutation.graphql';

if (!process.env.IRON_SESSION_COOKIE_SECRET) {
  console.warn(
    'No `IRON_SESSION_COOKIE_SECRET` environment variable was set. This can cause production errors.'
  );
}

// The duration that the session will be valid for in seconds (default: 7 days).
// Sessions will automatically be renewed after 50% of the validity period.
// NOTE: The duration is meant to match the backend Identity cookie duration, which is 7 days.
const IRON_SESSION_TTL = 7 * 24 * 3600;

export const sessionOptions: IronSessionOptions = {
  password: {
    1: process.env.IRON_SESSION_COOKIE_SECRET as string,
  },
  cookieName: 'SP_SESSION',
  ttl: IRON_SESSION_TTL,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    httpOnly: true,
  },
};

declare module 'iron-session' {
  interface IronSessionData {
    sessionId?: string;
  }
}

const create = async (req: IncomingMessage, sessionId: string) => {
  req.session.sessionId = sessionId;
  await req.session.save();
  return sessionId;
};

const destroy = (req: IncomingMessage) => {
  req.session.destroy();
  return null;
};

export const createIronSession = async (
  req: IncomingMessage,
  sessionId: string
) => {
  return await create(req, sessionId);
};

export const removeIronSession = async (req: IncomingMessage) => {
  const sessionId = req.session.sessionId!;
  destroy(req);
  return sessionId;
};

type Session = sessionsQuery['response']['sessionById'];

const sessionCache = new WeakMap<IncomingMessage, Partial<Session> | null>();
export const resolveSession = async ({
  req,
}: Pick<GetServerSidePropsContext, 'req'>) => {
  // `sessionCache` allows us to safely call `resolveSession` multiple times a request.
  if (sessionCache.has(req)) return sessionCache.get(req);

  const env = createRelayEnvironment(true, {
    ...(req.headers as Record<string, string>),
  });

  let session: Session | null | undefined = null;
  const sessionId = req.session.sessionId;

  if (sessionId) {
    session = await fetchSession(env, sessionId);
    if (!session) return destroy(req);

    // Renew the session if 50% of the session time has elapsed.
    const shouldRefreshSession =
      differenceInSeconds(new Date(session.expiresAt!), new Date()) <
      0.5 * IRON_SESSION_TTL;

    if (shouldRefreshSession) {
      session = await refreshSession(env, session.id!);
      if (!session) return destroy(req);
      await create(req, session.id!);
    }
  }

  sessionCache.set(req, session);
  return session;
};

const fetchSession = async (
  env: Environment,
  sessionId: string
): Promise<Session | null | undefined> => {
  return await fetchQuery<sessionsQuery>(
    env,
    graphql`
      query sessionsQuery($id: ID!) {
        sessionById(id: $id) {
          id
          createdAt
          updatedAt
          expiresAt
        }
      }
    `,
    { id: sessionId }
  )
    .toPromise()
    .then((resp) => resp?.sessionById)
    .catch((err) => {
      console.log('[ERROR] - fetching client session: ', err);
      return null;
    });
};

const refreshSession = async (
  env: Environment,
  sessionId: string
): Promise<Session | null | undefined> => {
  const promise = new Promise<Session | null | undefined>((resolve, reject) => {
    commitMutation<sessionsMutation>(env, {
      mutation: graphql`
        mutation sessionsMutation($input: RefreshSessionInput!) {
          refreshSession(input: $input) {
            authPayload {
              session {
                id
                createdAt
                updatedAt
                expiresAt
              }
            }
            errors {
              ... on Error {
                message
              }
            }
          }
        }
      `,
      variables: { input: { sessionId } },
      onError: (err) => {
        console.error('[ERROR] - refreshing client session: ', err);
        reject(err);
      },
      onCompleted: (resp) => {
        const { authPayload, errors } = resp.refreshSession;
        if (errors) resolve(null);
        resolve(authPayload?.session);
      },
    });
  });

  return await promise.then((session) => session).catch(() => null);
};
