import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "utils/middlewares";
import methods from "micro-method-router";
import { getUserData, updateUserData } from "controllers/userController";

export default authMiddleware(
  methods({
    get: async (
      req: NextApiRequest,
      res: NextApiResponse,
      id: string,
      token: string
    ) => {
      try {
        const userData = await getUserData(id);
        res.send(JSON.stringify({ userData }));
      } catch (error) {
        res
          .status(400)
          .json({ error: error.message, message: "error en el GET /me" });
      }
    },
    patch: async (
      req: NextApiRequest,
      res: NextApiResponse,
      id: string,
      token: string
    ) => {
      try {
        const { userData } = req.body;
        const updatedData = await updateUserData(id, userData);
        res.status(200).send(JSON.stringify({ updatedData }));
      } catch (error) {
        console.error({
          error: error.message,
          message: "error en el endpoint",
        });
        res.status(400).send("algo malio sal");
      }
    },
  })
);
