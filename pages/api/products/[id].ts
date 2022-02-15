import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { getProductById } from "controllers/algoliaController";

export default methods({
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    try {
      const product = await getProductById(id);
      res.json({
        product,
      });
    } catch (error) {
      res.status(404).json({ message: "product not found" });
      console.error(error.message, "error en el endpoint");
    }
  },
});
