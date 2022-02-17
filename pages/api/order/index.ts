import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "utils/middlewares";
import methods from "micro-method-router";
import { getProductById } from "controllers/algoliaController";
import { createPreferenceInMP } from "controllers/orderController";
import { validator } from "utils/yup";
import * as yup from "yup";

const bodySchema = yup.object().shape({
  query: yup.object().shape({
    productId: yup.string().required(),
  }),
});

const handler = methods({
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
});

export default validator(authMiddleware(handler), bodySchema);
