'use client';

import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import s from "./ProductList.module.scss";
import Pagination from "./components/Pagination/Pagination";
import type { ProductProps } from "./types";
import Loader from "@UI/Loader";
import { useStore } from "@stores/context";
import { useProductListStore } from "../../context";
import Product from "./components/Product/Product";

const ProductList: React.FC<ProductProps> = observer(({ products, loading }) => {
  const router = useRouter();
  const { cartStore } = useStore();
  const productListStore = useProductListStore();
  const [toast, setToast] = useState<string | null>(null);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <>
      {toast && <div className={s.toast}>{toast}</div>}
      {loading ? (
        <div className={s.loader}>
          <Loader size="l" />
        </div>
      ) : (
        <>
          <div className={s.grid}>
            {products.map((product) => {
              const image: string = product.images[0].url;
              const inCart = cartStore.isInCart(product.documentId);
              const discountedPrice = product.discountPercent
                ? (product.price * (1 - product.discountPercent / 100)).toFixed(2)
                : null;
              return (
                <Product
                  key={product.documentId}
                  product={product}
                  image={image}
                  discountedPrice={discountedPrice}
                  inCart={inCart}
                  setToast={setToast}
                />
              );
            })}
          </div>
          <Pagination
            currentPage={productListStore.currentPage}
            totalPages={productListStore.totalPages}
            onPageChange={productListStore.setPage}
          />
        </>
      )}
    </>
  );
});

export default ProductList;
