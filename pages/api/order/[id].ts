import type { NextApiRequest, NextApiResponse } from "next";
import { getPayment } from "lib/mercagopago";
import { getOrderData } from "controllers/orderController";
import methods from "micro-method-router";
import { authMiddleware } from "utils/middlewares";
import { validator } from "utils/yup";
import * as yup from "yup";

const querySchema = yup.object().shape({
  query: yup.object().shape({
    id: yup.string().required(),
  }),
});

const handler = methods({
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id } = req.query;
      //const { body } = await getPayment(id as string);
      const data = await getOrderData(id as string);
      res.send({ orderData: data.mercadopagoResponse.status });
    } catch (error) {
      console.error(error, "error en el endpoint /order/[id]");
    }
  },
});

export default validator(authMiddleware(handler), querySchema);
