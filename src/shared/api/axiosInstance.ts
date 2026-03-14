import axios from "axios";

export function authHeaders() {
  const jwt = localStorage.getItem("jwt") || "";
  return jwt ? { authorization: `Bearer ${jwt}` } : {};
}

export const apiProducts = axios.create({
  baseURL: "https://front-school-strapi.ktsdev.ru/api/products",
});

export const apiCategories = axios.create({
  baseURL: "https://front-school-strapi.ktsdev.ru/api/product-categories",
});

// Интерсептор подставляет актуальный токен перед каждым запросом
[apiProducts, apiCategories].forEach((instance) => {
  instance.interceptors.request.use((config) => {
    Object.assign(config.headers, authHeaders());
    return config;
  });
});
