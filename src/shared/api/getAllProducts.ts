import qs from "qs";
import type { ProductsResponse } from "@/shared/types/product";

const BASE_URL = "https://front-school-strapi.ktsdev.ru/api/products";

type GetAllProductsParams = {
  search?: string;
  categories?: string[];
  page?: number;
  pageSize?: number;
};

export const getAllProducts = async (params: GetAllProductsParams = {}): Promise<ProductsResponse> => {
  const { search, categories, page = 1, pageSize = 9 } = params;
  const queryObj: any = {
    populate: ["images", "productCategory"],
    pagination: { page, pageSize },
  };
  if (search) {
    queryObj.filters = {
      ...queryObj.filters,
      title: { $containsi: search },
    };
  }
  if (categories && categories.length > 0) {
    queryObj.filters = {
      ...queryObj.filters,
      productCategory: { documentId: { $in: categories } },
    };
  }
  const query = qs.stringify(queryObj);
  const res = await fetch(`${BASE_URL}?${query}`, { cache: "no-store" });
  return res.json();
};
