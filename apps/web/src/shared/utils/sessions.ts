import { Environment, fetchQuery, graphql, commitMutation } from 'react-relay';
import { IncomingMessage, ServerResponse } from 'http';
import { GetServerSidePropsContext } from 'next';
import { IronSessionOptions, getIronSession, IronSession } from 'iron-session';
import { differenceInSeconds } from 'date-fns';
import { createRelayEnvironment } from './relay';
import { sessionsQuery } from './__generated__/sessionsQuery.graphql';
import { sessionsMutation } from './__generated__/sessionsMutation.graphql';

if (typeof window === 'undefined' && !process.env.IRON_SESSION_COOKIE_SECRET) {
  console.warn(
    'No `IRON_SESSION_COOKIE_SECRET` environment variable was set. This can cause production errors.',
  );
}

// The duration that the session will be valid for in seconds (default: 7 days).
// Sessions will automatically be renewed after 50% of the validity period.
// NOTE: The duration is meant to match the backend Identity cookie duration, which is 7 days.
const IRON_SESSION_TTL = 7 * 24 * 3600;

const SESSION_OPTIONS: IronSessionOptions = {
  password: {
    1: process.env.IRON_SESSION_COOKIE_SECRET as string,
  },
  cookieName: 'SP_SESSION',
  ttl: IRON_SESSION_TTL,
  cookieOptions: {
    sameSite: 'strict',
    secure: true,
    httpOnly: true,
  },
};

declare module 'iron-session' {
  interface IronSessionData {
    sessionId?: string;
  }
}

const create = async (ironSession: IronSession, sessionId: string) => {
  ironSession.sessionId = sessionId;
  await ironSession.save();
  return sessionId;
};

const destroy = (ironSession: IronSession) => {
  console.log('Destroying session!');
  ironSession.destroy();
  return null;
};

export const createIronSession = async (
  req: IncomingMessage,
  res: ServerResponse,
  sessionId: string,
) => {
  const ironSession = await getIronSession(req, res, SESSION_OPTIONS);
  return await create(ironSession, sessionId);
};

export const removeIronSession = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const ironSession = await getIronSession(req, res, SESSION_OPTIONS);
  const sessionId = ironSession.sessionId;
  destroy(ironSession);
  return sessionId;
};

type Session = sessionsQuery['response']['sessions'][number] | null | undefined;

const sessionCache = new WeakMap<IncomingMessage, Session>();
export const resolveSession = async ({
  req,
  res,
}: Pick<GetServerSidePropsContext, 'req' | 'res'>): Promise<Session> => {
  // `sessionCache` allows us to safely call `resolveSession` multiple times a request.
  if (sessionCache.has(req)) return sessionCache.get(req);

  const env = createRelayEnvironment(true, req.headers);

  const ironSession = await getIronSession(req, res, SESSION_OPTIONS);
  const sessionId = ironSession.sessionId;
  let session: Session = null;

  if (sessionId) {
    session = await fetchSession(env, sessionId);
    if (!session) return destroy(ironSession);

    // Renew the session if 50% of the session time has elapsed.
    const shouldRefreshSession =
      differenceInSeconds(new Date(session.expiresAt), new Date()) <
      0.5 * IRON_SESSION_TTL;

    if (shouldRefreshSession) {
      session = await refreshSession(env, session.id!);
      if (!session) return destroy(ironSession);
      await create(ironSession, session.id!);
    }
  }

  sessionCache.set(req, session);
  return session;
};

const fetchSession = async (
  env: Environment,
  sessionId: string,
): Promise<Session> => {
  return await fetchQuery<sessionsQuery>(
    env,
    graphql`
      query sessionsQuery($id: ID!, $now: DateTime!) {
        sessions(where: { id: { eq: $id }, expiresAt: { gte: $now } }) {
          id
          createdAt
          updatedAt
          expiresAt
        }
      }
    `,
    { id: sessionId, now: new Date().toISOString() },
  )
    .toPromise()
    .then((resp) => {
      return resp?.sessions[0] as unknown as Session;
    })
    .catch((err) => {
      console.log('[ERROR] - fetching client session: ', err);
      return null;
    });
};

const refreshSession = async (
  env: Environment,
  sessionId: string,
): Promise<Session> => {
  const promise = new Promise<Session>((resolve, reject) => {
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
