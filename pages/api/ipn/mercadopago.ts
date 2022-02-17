import { getMerchantOrder, getPayment } from "lib/mercagopago";
import { updateOrderInDb } from "controllers/orderController";
import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

export default methods({
  async post(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query = req.query;
    if (query.topic === "merchant_order") {
      const merchant_order = await getMerchantOrder(query.id as string);
      res.send(merchant_order);
    }
    if (query.type === "payment") {
      const paymentInfo = await getPayment(query["data.id"] as string);
      await updateOrderInDb(paymentInfo);
      const statusAndReferenceResponse = {
        external_reference: paymentInfo.body.external_reference,
        status: paymentInfo.body.status,
        paymentid: query["data.id"],
      };
      res.send(statusAndReferenceResponse);
    }
  },
});
