import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "utils/middlewares";
import methods from "micro-method-router";
import { getProductById } from "controllers/algoliaController";
import { createPreferenceInMP } from "controllers/orderController";
export default authMiddleware(
  methods({
    async post(req: NextApiRequest, res: NextApiResponse, id: string) {
      const { productId } = req.query;
      try {
        const { object } = (await getProductById(productId)) as any;
        const test = await createPreferenceInMP(id, object);
        res.send(test);
      } catch (error) {
        res.status(404).json({ message: "product not found" });
        console.log(error, "error en el endpoint");
      }
    },
  })
);
