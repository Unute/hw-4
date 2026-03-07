import { createContext, useContext } from "react";
import type { ProductListStore } from "@stores/ProductListStore";

const ProductListContext = createContext<ProductListStore | null>(null);

export const ProductListProvider = ProductListContext.Provider;

export const useProductListStore = (): ProductListStore => {
  const store = useContext(ProductListContext);
  if (!store) {
    throw new Error("useProductListStore must be used within ProductListProvider");
  }
  return store;
};
