import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { createIronSession, sessionOptions } from '../../../shared/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const sessionId = await createIronSession(req, req.body);
  res.send(JSON.stringify(sessionId))
};

export default withIronSessionApiRoute(handler, sessionOptions);
