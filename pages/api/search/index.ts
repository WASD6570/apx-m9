import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { searchProduct } from "controllers/algoliaController";
import { validator } from "utils/yup";
import * as yup from "yup";

const querySchema = yup
  .object()
  .shape({
    query: yup.object().shape({
      search: yup.string().required(),
      limit: yup.string(),
      offset: yup.string(),
    }),
  })
  .noUnknown(true, "only search, limit and offset params are allowed");

const handler = methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { search, limit = "10", offset = "0" } = req.query;
      const { hits, nbHits, realLimit, realOffset } = await searchProduct(
        search,
        limit,
        offset
      );
      res.status(200).json({
        results: hits,
        pagination: {
          offset: realOffset,
          limit: realLimit,
          total: nbHits,
        },
      });
    } catch (error) {
      console.log({ error, message: error.message });
      res.status(404).send("Prodoct not found");
    }
  },
});

export default validator(handler, querySchema);
