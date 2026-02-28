import axios from "axios";

const API_TOKEN = import.meta.env.VITE_API_TOKEN;
console.log("API_TOKEN", API_TOKEN);

const baseHeaders = {
  authorization: `${API_TOKEN}`,
};

export const api = axios.create({
  baseURL: "https://front-school-strapi.ktsdev.ru/api/products",
  headers: baseHeaders,
});

export const apiCategories = axios.create({
  baseURL: "https://front-school-strapi.ktsdev.ru/api/product-categories",
  headers: baseHeaders,
});
