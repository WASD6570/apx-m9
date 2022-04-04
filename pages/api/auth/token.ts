import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "controllers/authController";
import methods from "micro-method-router";
import { validator } from "utils/yup";
import * as yup from "yup";

const bodySchema = yup
  .object()
  .shape({
    body: yup.object().shape({
      email: yup.string().required(),
      code: yup.number().required(),
    }),
  })
  .noUnknown(true, "this request only accepts email and auth code in body");

const handler = methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { email, code } = req.body;
      const cleanEmail = email.trim().toLowerCase();
      const token = await getToken({ email: cleanEmail, code });
      if (token === "email or code not valid") {
        res.status(403).send({ message: token });
      } else {
        res.status(200).send({ token });
      }
    } catch (error) {
      console.error({ error: error.message }, "error en POST /auth/token");
    }
  },
});

export default validator(handler, bodySchema);
