import { gql } from '@apollo/client';
import { IncomingMessage } from 'http';
import { GetServerSidePropsContext } from 'next';
import { applySession, SessionOptions } from 'next-iron-session';
import { createApolloClient } from './apollo';
import { Session } from '~/__generated__/schema.generated';
import {
  SessionQuery,
  SessionQueryVariables,
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
  },
};

export const createSession = async (
  req: IncomingMessage,
  sessionId: string
) => {
  const reqWithSession = (req as unknown) as ReqWithSession;
  reqWithSession.session.set(IRON_SESSION_ID_KEY, sessionId);
  await reqWithSession.session.save();
  return sessionId;
};

export const removeSession = async (req: IncomingMessage) => {
  const reqWithSession = (req as unknown) as ReqWithSession;
  const sessionId = reqWithSession.session.get(IRON_SESSION_ID_KEY);
  reqWithSession.session.destroy();
  return sessionId;
};

const sessionCache = new WeakMap<IncomingMessage, Partial<Session> | null>();
export const resolveSession = async ({
  req,
  res,
}: Pick<GetServerSidePropsContext, 'req' | 'res'>) => {
  if (sessionCache.has(req)) {
    return sessionCache.get(req);
  }

  const client = createApolloClient({
    headers: req.headers as Record<string, string>,
  });

  await applySession(req, res, sessionOptions);

  let session: Partial<Session> | null = null;

  const reqWithSession = (req as unknown) as ReqWithSession;
  const sessionId = reqWithSession.session.get(IRON_SESSION_ID_KEY);

  if (sessionId) {
    const data = await client
      .query<SessionQuery, SessionQueryVariables>({
        query: gql`
          query SessionQuery {
            sessionById(
              id: "${sessionId}"
            ) {
              id
              createdAt
              updatedAt
            }
          }
        `,
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
    session = data?.data.sessionById ?? null;
  }

  sessionCache.set(req, session);
  return session;
};
