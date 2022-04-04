import { productIndex } from "lib/algolia";
import { paginationLimit } from "utils/pagination";

type item = {};

async function getProductById(id: string | string[]): Promise<item> {
  return await productIndex.findObject((hit) => hit.objectID == id);
}

async function searchProduct(
  search: string | string[],
  limit: string | string[],
  offset: string | string[]
): Promise<any> {
  const { nbHits: totalRows } = await productIndex.search("", {
    attributesToRetrieve: null,
    attributesToHighlight: null,
    hitsPerPage: 0,
  });

  const { realLimit, realOffset } = paginationLimit(
    limit as string,
    offset as string,
    totalRows
  );

  const { hits, nbHits } = await productIndex.search(search as string, {
    offset: realOffset,
    length: realLimit,
    hitsPerPage: realLimit,
    attributesToHighlight: [],
  });
  return { hits, nbHits, realLimit, realOffset };
}

async function getTopProducts() {
  const { hits } = await productIndex.search("", {
    hitsPerPage: 3,
    numericFilters: ["Total units sold: 999999 TO 5 "],
  });
  return hits;
}

export { getProductById, searchProduct, getTopProducts };
