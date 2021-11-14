import { gql, ApolloClient } from '@apollo/client';
import { IncomingMessage } from 'http';
import { GetServerSidePropsContext } from 'next';
import { applySession, SessionOptions } from 'next-iron-session';
import { differenceInSeconds } from 'date-fns';
import { createApolloClient } from '../../../shared/utils/apollo';
import { Session } from '../../../__generated__/schema.generated';
import {
  RefreshSessionMutation,
  RefreshSessionMutationVariables,
  SessionQuery,
  SessionQueryVariables,
} from './__generated__/index.generated';

if (!process.env.IRON_SESSION_COOKIE_SECRET) {
  console.warn(
    'No `IRON_SESSION_COOKIE_SECRET` environment variable was set. This can cause production errors.'
  );
}

// The duration that the session will be valid for in seconds (default: 7 days).
// Sessions will automatically be renewed after 50% of the validity period.
// NOTE: The duration is meant to match the backend Identity cookie duration, which is 7 days.
const IRON_SESSION_TTL = 7 * 24 * 3600;
const IRON_SESSION_ID_KEY = 'sessionId';

export const sessionOptions: SessionOptions = {
  password: [
    {
      id: 1,
      password: process.env.IRON_SESSION_COOKIE_SECRET as string,
    },
  ],
  cookieName: 'SP_SESSION',
  ttl: IRON_SESSION_TTL,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    httpOnly: true,
  },
};

interface ReqWithSession extends IncomingMessage {
  session: import('next-iron-session').Session;
}

const create = async (req: ReqWithSession, sessionId: string) => {
  req.session.set(IRON_SESSION_ID_KEY, sessionId);
  await req.session.save();
  return sessionId;
};

const destroy = (req: ReqWithSession) => {
  req.session.destroy();
  return null;
};

export const createClientSession = async (
  req: IncomingMessage,
  sessionId: string
) => {
  const reqWithSession = (req as unknown) as ReqWithSession;
  return await create(reqWithSession, sessionId);
};

export const removeClientSession = async (req: IncomingMessage) => {
  const reqWithSession = (req as unknown) as ReqWithSession;
  const sessionId = reqWithSession.session.get(IRON_SESSION_ID_KEY) as string;
  destroy(reqWithSession);
  return sessionId;
};

const sessionCache = new WeakMap<IncomingMessage, Partial<Session> | null>();
export const resolveClientSession = async ({
  req,
  res,
}: Pick<GetServerSidePropsContext, 'req' | 'res'>) => {
  // sessionCache allows us to safely call resolveClientSession multiple times a request.
  if (sessionCache.has(req)) return sessionCache.get(req);

  const client = createApolloClient({
    headers: req.headers as Record<string, string>,
  });

  await applySession(req, res, sessionOptions);

  let session: Partial<Session> | null = null;

  const reqWithSession = (req as unknown) as ReqWithSession;
  const sessionId = reqWithSession.session.get(IRON_SESSION_ID_KEY) as string;

  if (sessionId) {
    session = await fetchSession(client, sessionId);
    if (!session) return destroy(reqWithSession);

    // Renew the session if 50% of the session time has elapsed.
    const shouldRefreshSession =
      differenceInSeconds(new Date(session.expiresAt!), new Date()) <
      0.5 * IRON_SESSION_TTL;

    if (shouldRefreshSession) {
      session = await refreshSession(client, session.id!);
      if (!session) return destroy(reqWithSession);
      await create(reqWithSession, session.id!);
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
    console.log('Fetch client session: ', error);
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
    console.log('Refresh client session error: ', error);
    return null;
  }
};
