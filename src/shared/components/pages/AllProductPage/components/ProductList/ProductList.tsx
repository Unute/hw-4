'use client';

import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
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

  return (
    <>
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
              return (
                <Card
                  key={product.documentId}
                  image={image}
                  captionSlot={product.productCategory?.title}
                  title={product.title}
                  subtitle={product.description}
                  contentSlot={`$${product.price}`}
                  onClick={() => router.push(`/product/${product.documentId}`)}
                  actionSlot={
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        inCart
                          ? cartStore.removeFromCart(product.documentId)
                          : cartStore.addToCart(product.id, 1);
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
