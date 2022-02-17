import type { NextApiRequest, NextApiResponse } from "next";

export function validator(callback, schema) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await schema.validate(req);
      callback(req, res);
    } catch (error) {
      res.status(422).json({ error: error });
      console.error(error, "error en el validador");
    }
  };
}
