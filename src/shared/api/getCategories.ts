import qs from "qs";
import type { ProductCategory } from "@/shared/types/productCategory";

const BASE_URL = "https://front-school-strapi.ktsdev.ru/api/product-categories";

type CategoriesResponse = {
  data: ProductCategory[];
};

export const getCategories = async (): Promise<ProductCategory[]> => {
  const query = qs.stringify({ pagination: { pageSize: 100 } });
  const res = await fetch(`${BASE_URL}?${query}`, { cache: "force-cache" });
  const json: CategoriesResponse = await res.json();
  return json.data;
};
