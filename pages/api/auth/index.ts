import type { NextApiRequest, NextApiResponse } from "next";
import { sendCodeToUserEmail } from "controllers/authController";
import methods from "micro-method-router";

export default methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { email } = req.body;
      const cleanEmail = email.trim().toLowerCase();
      const test = await sendCodeToUserEmail(cleanEmail);
      res.status(200).send({ message: test });
    } catch (error) {
      console.error({ error: error.message }, "error en POST /auth");
      res.status(400).send("error en el auth");
    }
  },
});
