import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { removeIronSession, SESSION_OPTIONS } from '../../../shared/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const sessionId = await removeIronSession(req);
  res.send(JSON.stringify(sessionId));
};

export default withIronSessionApiRoute(handler, SESSION_OPTIONS);
