'use client';

import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import s from "./ProductList.module.scss";
import Pagination from "./components/Pagination";
import type { ProductProps } from "./types";
import Card from "@UI/Card";
import Loader from "@UI/Loader";
import Button from "@UI/Button";
import { useStore } from "@stores/context";
import { useProductListStore } from "../../context";

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
                <Card
                  key={product.documentId}
                  image={image}
                  captionSlot={
                    <span className={s.caption}>
                      {product.productCategory?.title}
                      {product.rating != null && (
                        <span className={s.rating}>⭐ {product.rating}</span>
                      )}
                    </span>
                  }
                  title={product.title}
                  subtitle={product.description}
                  contentSlot={
                    <span className={s.price}>
                      {discountedPrice ? (
                        <>
                          <span className={s.priceDiscounted}>${discountedPrice}</span>
                          <span className={s.priceOriginal}>${product.price}</span>
                          <span className={s.discountBadge}>-{product.discountPercent}%</span>
                        </>
                      ) : (
                        <span>${product.price}</span>
                      )}
                    </span>
                  }
                  onClick={() => router.push(`/product/${product.documentId}`)}
                  actionSlot={
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (inCart) {
                          cartStore.removeFromCart(product.documentId);
                          setToast(`Товар "${product.title}" удалён из корзины`);
                        } else {
                          cartStore.addToCart(product.id, 1);
                          setToast(`Товар "${product.title}" добавлен в корзину`);
                        }
                      }}
                    >
                      {inCart ? "Remove" : "Add to Cart"}
                    </Button>
                  }
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
