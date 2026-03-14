import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import s from "./ChangedProduct.module.scss";
import Button from "@UI/Button";
import Text from "@UI/Text";
import type { Product, ProductImage } from "@/shared/types/product";
import { useStore } from "@stores/context";
import Quantity from "@ProductComponents/Quantity/Quantity";
import Price from "@ProductComponents/Price/Price";


type ChangedProductProps = {
  product: Product;
  image: ProductImage[];
};

const ChangedProduct: React.FC<ChangedProductProps> = observer(({ product, image }) => {
  const { cartStore, authStore } = useStore();
  const router = useRouter();
  const inCart = cartStore.isInCart(product.documentId);
  const [toast, setToast] = useState<string | null>(null);
  const discountedPrice = product.discountPercent
    ? (product.price * (1 - product.discountPercent / 100)).toFixed(2)
    : null;

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleAddToCart = () => {
    if (!authStore.isAuthenticated) {
      router.push('/register');
      return;
    }
    cartStore.addToCart(product);
    setToast(`Товар "${product.title}" добавлен в корзину`);
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const incrementImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % image.length);
  }

  const decrementImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + image.length) % image.length);
  }

  return (
    <div className={s.content}>
      {toast && <div className={s.toast}>{toast}</div>}
      <div className={s.imageContainer}>
        <button className={s.leftBtn} onClick={decrementImage}>
          {"<"}
        </button>
        <img src={image[currentImageIndex]?.url} alt={product.title} className={s.image} />
        <button className={s.rightBtn} onClick={incrementImage}>
          {">"}
        </button>
      </div>

      <div className={s.info}>
        <Text view="title" weight="bold">
          {product.title}
        </Text>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Text view="p-14" color="secondary">
            {product?.productCategory?.title}
          </Text>
          <span className={s.rating}>⭐ {product.rating}</span>
        </div>
        <Text view="p-16" color="secondary" className={s.description}>
          {product.description}
        </Text>
        <span className={s.price}>
          {discountedPrice ? (
            <Price price={product.price} discountPercent={product.discountPercent} />
          ) : (
            <Text view="p-20" weight="bold">${product.price}</Text>
          )}
        </span>
        {inCart ? (
          <Quantity product={product} cartStore={cartStore} setToast={setToast} />
        ) : (
          <Button className={s.button_cart} onClick={handleAddToCart}>
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
});

export default ChangedProduct;
