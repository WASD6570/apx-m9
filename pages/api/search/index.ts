import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { searchProduct } from "controllers/algoliaController";

export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    const { search, limit = "10", offset = "0" } = req.query;

    try {
      const { hits, nbHits, realLimit, realOffset } = await searchProduct(
        search,
        limit,
        offset
      );
      res.status(200).json({
        results: hits.map((r) => {
          //@ts-ignore
          return { id: r.objectID, name: r.Name };
        }),
        pagination: {
          offset: realOffset,
          limit: realLimit,
          total: nbHits,
        },
      });
    } catch (error) {
      console.log({ error, message: error.message });
      res.status(500).send("serverError");
    }
  },
});
