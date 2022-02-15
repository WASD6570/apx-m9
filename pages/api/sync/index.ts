import type { NextApiRequest, NextApiResponse } from "next";
import { airtableBase } from "lib/airtable";
import { productIndex } from "lib/algolia";

export default function (req: NextApiRequest, res: NextApiResponse) {
  try {
    airtableBase("Furniture")
      .select({})
      .eachPage(
        async function page(records, fetchNextPage) {
          const results = records.map((record) => ({
            objectID: record.id,
            ...record.fields,
          }));

          await productIndex.saveObjects(results);

          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
          res.status(200).json({ result: "ok" });
        }
      );
  } catch (error) {
    console.log({ error, message: error.message });
    res.status(500).send("serverError");
  }
}
