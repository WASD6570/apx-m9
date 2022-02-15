import { getMerchantOrder } from "lib/mercagopago";
import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

export default methods({
  async post(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const body = req.body;
    const query = req.query;
    console.log({ body, query });
    res.status(200).json({ message: "testeanding", body, query });
  },
});
