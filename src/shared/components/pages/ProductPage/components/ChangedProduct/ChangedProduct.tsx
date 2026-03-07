import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import s from "./ChangedProduct.module.scss";
import Button from "@UI/Button";
import Text from "@UI/Text";
import type { Product } from "@/shared/types/product";
import { useStore } from "@stores/context";

type ChangedProductProps = {
  product: Product;
  image: string;
};

const ChangedProduct: React.FC<ChangedProductProps> = observer(({ product, image }) => {
  const { cartStore } = useStore();
  const inCart = cartStore.isInCart(product.documentId);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className={s.content}>
      {toast && <div className={s.toast}>{toast}</div>}
      <img src={image} alt={product.title} className={s.image} />
      <div className={s.info}>
        <Text view="title" weight="bold">
          {product.title}
        </Text>
        {product.productCategory && (
          <Text view="p-14" color="secondary">
            {product.productCategory.title}
          </Text>
        )}
        <Text view="p-16" color="secondary" className={s.description}>
          {product.description}
        </Text>
        <Text view="p-20" weight="bold">
          ${product.price}
        </Text>
        <Button
          className={s.button_cart}
          onClick={() => {
            if (inCart) {
              cartStore.removeFromCart(product.documentId);
              setToast(`Товар "${product.title}" удалён из корзины`);
            } else {
              cartStore.addToCart(product.id);
              setToast(`Товар "${product.title}" добавлен в корзину`);
            }
          }}
        >
          {inCart ? "Remove from Cart" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
});

export default ChangedProduct;
