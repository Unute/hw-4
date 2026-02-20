import axios from 'axios';
import qs from 'qs';
import type { Product } from '@/types/product';

const BASE_URL = 'https://front-school-strapi.ktsdev.ru/api/products';

type ProductByIdResponse = {
  data: Product;
};

export const getProductById = async (documentId: string): Promise<Product> => {
  const query = qs.stringify(
    { populate: ['images', 'productCategory'] },
  );

  const response = await axios.get<ProductByIdResponse>(`${BASE_URL}/${documentId}?${query}`);
  return response.data.data;
};
