import { useEffect } from "react";
import FilterPanel from "./components/FilterPanel";
import MainText from "./components/MainText/MainText";
import Product from "./components/Product/Product";
import { observer } from "mobx-react-lite";
import { productListStore } from "@/stores/ProductListStore";

const AllProductPage = observer(() => {
  
  useEffect(() => {
    productListStore.fetchProducts();
  }, []);

  return (
    <>
      <MainText />
      <FilterPanel total={productListStore.total} />
      <Product products={productListStore.products} loading={productListStore.loading} />
    </>
  );
});

export default AllProductPage;
