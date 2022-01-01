import { gql, ApolloClient } from '@apollo/client';
import { IncomingMessage } from 'http';
import { GetServerSidePropsContext } from 'next';
import { IronSessionOptions } from 'iron-session';
import { differenceInSeconds } from 'date-fns';
import { createApolloClient } from './apollo';
import { Session } from '../../__generated__/schema.generated';
import {
  RefreshSessionMutation,
  RefreshSessionMutationVariables,
  SessionQuery,
  SessionQueryVariables,
} from './__generated__/sessions.generated';

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

const sessionCache = new WeakMap<IncomingMessage, Partial<Session> | null>();
export const resolveSession = async ({
  req,
}: Pick<GetServerSidePropsContext, 'req'>) => {
  // `sessionCache` allows us to safely call `resolveSession` multiple times a request.
  if (sessionCache.has(req)) return sessionCache.get(req);

  const client = createApolloClient({
    headers: req.headers as Record<string, string>,
  });

  let session: Partial<Session> | null = null;
  const sessionId = req.session.sessionId;

  if (sessionId) {
    session = await fetchSession(client, sessionId);
    if (!session) return destroy(req);

    // Renew the session if 50% of the session time has elapsed.
    const shouldRefreshSession =
      differenceInSeconds(new Date(session.expiresAt!), new Date()) <
      0.5 * IRON_SESSION_TTL;

    if (shouldRefreshSession) {
      session = await refreshSession(client, session.id!);
      if (!session) return destroy(req);
      await create(req, session.id!);
    }
  }

  sessionCache.set(req, session);
  return session;
};

const fetchSession = async (
  client: ApolloClient<any>,
  sessionId: string
): Promise<Partial<Session> | null> => {
  try {
    const data = await client.query<SessionQuery, SessionQueryVariables>({
      query: gql`
        query SessionQuery {
          sessionById(
            id: "${sessionId}"
          ) {
            id
            createdAt
            updatedAt
            expiresAt
          }
        }
      `,
    });

    return data.data.sessionById;
  } catch (error) {
    console.log('[ERROR] - fetching client session: ', error);
    return null;
  }
};

const refreshSession = async (
  client: ApolloClient<any>,
  sessionId: string
): Promise<Partial<Session> | null> => {
  try {
    const data = await client.mutate<
      RefreshSessionMutation,
      RefreshSessionMutationVariables
    >({
      variables: { input: { sessionId } },
      mutation: gql`
        mutation RefreshSessionMutation($input: RefreshSessionInput!) {
          refreshSession(input: $input) {
            session {
              id
              createdAt
              updatedAt
              expiresAt
            }
          }
        }
      `,
    });

    return data.data?.refreshSession?.session || null;
  } catch (error) {
    console.log('[ERROR] -  refreshing client session: ', error);
    return null;
  }
};
