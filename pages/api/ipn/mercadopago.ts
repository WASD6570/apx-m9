import { getMerchantOrder, getPayment } from "lib/mercagopago";
import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

export default methods({
  async post(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query = req.query;
    if (query.topic === "merchant_order") {
      const test = await getMerchantOrder(query.id as string);
      console.log(test);

      res.send(test);
    }
    if (query.type === "payment") {
      const paymentInfo = await getPayment(query["data.id"] as string);
      console.log(paymentInfo);

      res.send(paymentInfo);
    }
  },
});
