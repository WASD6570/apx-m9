import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "controllers/authController";
import methods from "micro-method-router";

export default methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { email, code } = req.body;
      const cleanEmail = email.trim().toLowerCase();
      const token = await getToken({ email: cleanEmail, code });
      res.status(200).send({ token });
    } catch (error) {
      console.error({ error: error.message }, "error en POST /auth/token");
    }
  },
});
