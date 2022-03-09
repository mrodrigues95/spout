import { NextApiRequest, NextApiResponse } from 'next';
import { removeIronSession } from '../../../shared/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const sessionId = await removeIronSession(req, res);
  res.send(JSON.stringify(sessionId));
};

export default handler;
