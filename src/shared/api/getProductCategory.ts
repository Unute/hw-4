import qs from "qs";
import type { ProductsResponse } from "@/shared/types/product";

const BASE_URL = "https://front-school-strapi.ktsdev.ru/api/products";

export const getProductsByCategory = async (
  productCategoryDocumentId: string | null,
): Promise<ProductsResponse> => {
  const query = qs.stringify({
    populate: ["images", "productCategory"],
    ...(productCategoryDocumentId && {
      filters: {
        productCategory: { documentId: { $eq: productCategoryDocumentId } },
      },
    }),
  });
  const res = await fetch(`${BASE_URL}?${query}`, { cache: "no-store" });
  return res.json();
};
