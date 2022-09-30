import { setCookies } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body;
  setCookies("token", token, {
    req,
    res,
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "none",
    httpOnly: true,
    secure: true,
  });

  return res.status(200).json({ message: "ok" });
}

export default handler;