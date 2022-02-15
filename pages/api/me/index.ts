import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "utils/middlewares";
import methods from "micro-method-router";
import { getUserData, updateUserData } from "controllers/userController";

const handler = methods({
  async get(
    req: NextApiRequest,
    res: NextApiResponse,
    id: string,
    token: string
  ) {
    try {
      const userData = await getUserData(id);
      res.setHeader("content-type", "application/json").json({ userData });
    } catch (error) {
      res
        .status(400)
        .json({ error: error.message, message: "error en el GET /me" });
    }
  },
  async patch(
    req: NextApiRequest,
    res: NextApiResponse,
    id: string,
    token: string
  ) {
    try {
      const { userData } = req.body;
      const updatedData = await updateUserData(id, userData);
      res.setHeader("content-type", "application/json").json({ updatedData });
    } catch (error) {
      console.error({
        error: error.message,
        message: "error en el endpoint",
      });
      res.status(400).send("algo malio sal");
    }
  },
});

export default authMiddleware(handler);
