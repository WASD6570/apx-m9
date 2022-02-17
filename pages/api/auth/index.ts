import type { NextApiRequest, NextApiResponse } from "next";
import { sendCodeToUserEmail } from "controllers/authController";
import methods from "micro-method-router";
import * as yup from "yup";
import { validator } from "utils/yup";

const bodySchema = yup
  .object()
  .shape({
    body: yup.object().shape({
      email: yup.string().required(),
    }),
  })
  .noUnknown(true, "this request only accepts email in body");

const handler = methods({
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

export default validator(handler, bodySchema);
