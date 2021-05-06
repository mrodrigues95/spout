import { gql, ApolloClient } from '@apollo/client';
import { IncomingMessage } from 'http';
import { GetServerSidePropsContext } from 'next';
import { applySession, SessionOptions } from 'next-iron-session';
import { createApolloClient } from './apollo';
import { Session } from '~/__generated__/schema.generated';
import {
  SessionQuery,
  SessionQueryVariables,
  RefreshSessionMutation,
  RefreshSessionMutationVariables,
} from './__generated__/sessions.generated';

const IRON_SESSION_ID_KEY = 'sessionId';

interface ReqWithSession extends IncomingMessage {
  session: import('next-iron-session').Session;
}

export const sessionOptions: SessionOptions = {
  password: [
    {
      id: 1,
      password: process.env.IRON_SESSION_COOKIE_SECRET as string,
    },
  ],
  cookieName: 'SP_SESSION',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    httpOnly: true,
    maxAge: 604800 - 60, // 7 days - 60 seconds to make up for clock difference between the server and client.
  },
};

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
  if (sessionCache.has(req)) return sessionCache.get(req);

  const client = createApolloClient({
    headers: req.headers as Record<string, string>,
  });

  await applySession(req, res, sessionOptions);

  let session: Partial<Session> | null = null;

  const reqWithSession = (req as unknown) as ReqWithSession;
  const sessionId = reqWithSession.session.get(IRON_SESSION_ID_KEY) as string;

  // If we have an active client session, that means there is a `sessionId` associated
  // with it and therefore we can fetch it from the server. Otherwise, the session
  // has most likely expired and requires a refresh.
  if (sessionId) {
    session = await fetchClientSession(client, sessionId);
    if (!session) return destroy(reqWithSession);
  } else {
    session = await refreshClientSession(client);
    if (!session) return destroy(reqWithSession);

    // A new session needs to be created with `next-iron-session`.
    await create(reqWithSession, session.id!);
  }

  sessionCache.set(req, session);
  return session;
};

const fetchClientSession = async (
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
    console.log(error);
    return null;
  }
};

const refreshClientSession = async (
  client: ApolloClient<any>
): Promise<Partial<Session> | null> => {
  try {
    const data = await client.mutate<
      RefreshSessionMutation,
      RefreshSessionMutationVariables
    >({
      mutation: gql`
        mutation RefreshSessionMutation {
          refreshSession {
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

    return data.data?.refreshSession.session || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
