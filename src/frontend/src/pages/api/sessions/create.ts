import { NextApiRequest, NextApiResponse } from 'next';
import { applySession } from 'next-iron-session';
import { createSession, sessionOptions } from '~/shared/utils/sessions';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await applySession(req, res, sessionOptions);
  const sessionId = await createSession(req, req.body);
  res.json(sessionId);
};

export default handler;
