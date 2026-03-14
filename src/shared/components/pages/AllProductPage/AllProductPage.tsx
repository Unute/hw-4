'use client';

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { reaction } from "mobx";
import FilterPanel from "./components/FilterPanel";
import MainText from "./components/MainText/MainText";
import ProductList from "./components/ProductList/ProductList";
import { observer, useLocalObservable } from "mobx-react-lite";
import { ProductListStore } from "@stores/ProductListStore";
import { ProductListProvider } from "./context";
import type { Product } from "@/shared/types/product";
import type { Option } from "@UI/MultiDropdown";

type AllProductPageProps = {
  initialProducts?: Product[];
  initialCategories?: Option[];
  initialTotal?: number;
};

const AllProductPage = observer(({ initialProducts, initialCategories, initialTotal }: AllProductPageProps) => {
  const productListStore = useLocalObservable(() => {
    const store = new ProductListStore();
    if (initialProducts) {
      store.products = initialProducts;
      store.loading = false;
    }
    if (initialCategories) {
      store.categories = initialCategories;
      store.categoriesLoaded = true;
    }
    if (initialTotal !== undefined) {
      store.total = initialTotal;
    }
    return store;
  });
  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams.get("search") ?? "";
    const page = Number(searchParams.get("page")) || 1;
    const categoriesParam = searchParams.get("categories") ?? "";
    const categoryKeys = categoriesParam ? categoriesParam.split(",") : [];

    productListStore.initFromParams({ search, page, categoryKeys });

    const hasUrlParams = search || categoryKeys.length > 0 || page > 1;

    if (hasUrlParams || !initialProducts) {
      productListStore.fetchCategories().then(() => {
        productListStore.restoreCategoriesFromKeys();
        productListStore.fetchProducts();
      });
    } else if (categoryKeys.length > 0) {
      productListStore.restoreCategoriesFromKeys();
    }
  }, []);

  useEffect(() => {
    const dispose = reaction(
      () => ({
        search: productListStore.committedSearch,
        categories: productListStore.selectedCategories.map((o) => o.key).join(","),
        page: productListStore.currentPage,
      }),
      ({ search, categories, page }) => {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (categories) params.set("categories", categories);
        if (page > 1) params.set("page", String(page));
        window.history.replaceState(null, "", `?${params.toString()}`);
      }
    );
    return dispose;
  }, []);

  return (
    <ProductListProvider value={productListStore}>
      <MainText />
      <FilterPanel total={productListStore.total} />
      <ProductList products={productListStore.products} loading={productListStore.loading} />
    </ProductListProvider>
  );
});

export default AllProductPage;
