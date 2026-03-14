import qs from "qs";
import type { ProductsResponse } from "@/shared/types/product";

const BASE_URL = "https://front-school-strapi.ktsdev.ru/api/products";

type GetAllProductsParams = {
  search?: string;
  categories?: string[];
  page?: number;
  pageSize?: number;
  sort?: string;
  priceMin?: number;
  priceMax?: number;
};

export const getAllProducts = async (params: GetAllProductsParams = {}): Promise<ProductsResponse> => {
  const { search, categories, page = 1, pageSize = 9, sort, priceMax, priceMin } = params;
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
  if (sort) {
    queryObj.sort = [sort];
  }
  if (priceMin !== undefined) {
    queryObj.filters = {
      ...queryObj.filters,
      price: { ...queryObj.filters?.price, $gte: priceMin },
    };
  }
  if (priceMax !== undefined) {
    queryObj.filters = {
      ...queryObj.filters,
      price: { ...queryObj.filters?.price, $lte: priceMax },
    };
  }
  const query = qs.stringify(queryObj);
  const res = await fetch(`${BASE_URL}?${query}`, { cache: "no-store" });
  return res.json();
};
