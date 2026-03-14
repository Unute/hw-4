import qs from "qs";
import type { Product } from "@/shared/types/product";

const BASE_URL = "https://front-school-strapi.ktsdev.ru/api/products";

type ProductByIdResponse = {
  data: Product;
};

export const getProductById = async (documentId: string): Promise<Product> => {
  const query = qs.stringify({ populate: ["images", "productCategory"] });
  const res = await fetch(`${BASE_URL}/${documentId}?${query}`, { cache: "no-store" });
  const json: ProductByIdResponse = await res.json();
  return json.data;
};
