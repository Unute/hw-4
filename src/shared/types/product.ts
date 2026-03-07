import type { ProductCategory } from "./productCategory";

export type ProductImage = {
  id: number;
  documentId: string;
  url: string;
};

export type Product = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  images: ProductImage[];
  productCategory: ProductCategory | null;
};

export type ProductsResponse = {
  data: Product[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};
