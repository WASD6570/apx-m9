import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { getTopProducts } from "controllers/algoliaController";

const handler = methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    try {
      const data = await getTopProducts();
      res.status(200).json(data);
    } catch (error) {
      console.log({ error, message: error.message });
      res.status(500).send("server error");
    }
  },
});

export default handler;
