import { NextApiRequest, NextApiResponse } from 'next';
import { createIronSession } from '../../../shared/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const sessionId = await createIronSession(req, res, req.body);
  res.send(JSON.stringify(sessionId));
};

export default handler;
