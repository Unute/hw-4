import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { reaction } from "mobx";
import FilterPanel from "./components/FilterPanel";
import MainText from "./components/MainText/MainText";
import ProductList from "./components/ProductList/ProductList";
import { observer, useLocalObservable } from "mobx-react-lite";
import { ProductListStore } from "@/stores/ProductListStore";
import { ProductListProvider } from "./context";

const AllProductPage = observer(() => {
  const productListStore = useLocalObservable(() => new ProductListStore());
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const search = searchParams.get("search") ?? "";
    const page = Number(searchParams.get("page")) || 1;
    const categoriesParam = searchParams.get("categories") ?? "";
    const categoryKeys = categoriesParam ? categoriesParam.split(",") : [];

    productListStore.initFromParams({ search, page, categoryKeys });

    productListStore.fetchCategories().then(() => {
      productListStore.restoreCategoriesFromKeys();
      productListStore.fetchProducts();
    });
  }, []);

  useEffect(() => {
    const dispose = reaction(
      () => ({
        search: productListStore.searchQuery,
        categories: productListStore.selectedCategories.map((o) => o.key).join(","),
        page: productListStore.currentPage,
      }),
      ({ search, categories, page }) => {
        const params: Record<string, string> = {};
        if (search) params.search = search;
        if (categories) params.categories = categories;
        if (page > 1) params.page = String(page);
        setSearchParams(params, { replace: true });
      }
    );
    return dispose;
  }, [setSearchParams]);

  return (
    <ProductListProvider value={productListStore}>
      <MainText />
      <FilterPanel total={productListStore.total} />
      <ProductList products={productListStore.products} loading={productListStore.loading} />
    </ProductListProvider>
  );
});

export default AllProductPage;
