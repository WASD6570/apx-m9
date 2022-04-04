import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

export function validator(callback, schema) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await cors(req, res);
      await schema.validate(req);
      callback(req, res);
    } catch (error) {
      res.status(422).json({ error: error });
      console.error(error, "error en el validador");
    }
  };
}
