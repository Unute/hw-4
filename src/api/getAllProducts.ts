import axios from 'axios';
import qs from 'qs';
import type { ProductsResponse } from '@/types/product';

const BASE_URL = 'https://front-school-strapi.ktsdev.ru/api/products';

export const getAllProducts = async (): Promise<ProductsResponse> => {
  const query = qs.stringify(
    { populate: ['images', 'productCategory'] },
  );

  const response = await axios.get<ProductsResponse>(`${BASE_URL}?${query}`);
  return response.data;
};
