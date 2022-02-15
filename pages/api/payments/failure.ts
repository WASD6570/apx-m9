import type { NextApiRequest, NextApiResponse } from "next";

import methods from "micro-method-router";
export default methods({
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    res.send("rechazado");
  },
});
