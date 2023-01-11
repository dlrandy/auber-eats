import { NextApiRequest, NextApiResponse } from "next";
import { setTokenCookie } from "../../lib/cookies";

const login = (req: NextApiRequest, res: NextApiResponse) => {
  setTokenCookie(req.body.token, res)
  
  res.status(200).json({ success: true });
};

export default login;