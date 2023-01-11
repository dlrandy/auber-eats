import { NextApiRequest, NextApiResponse } from "next";
import { removeTokenCookie } from '../../lib/cookies/index';

const logout =  (req: NextApiRequest, res: NextApiResponse) => {
removeTokenCookie(res);
  res.status(200).json({ success: true });
};

export default logout;