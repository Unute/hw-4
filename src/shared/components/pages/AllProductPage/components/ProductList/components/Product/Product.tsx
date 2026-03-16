'use client';

import React from 'react'
import s from "./../../ProductList.module.scss";
import ps from "./Product.module.scss";
import Button from "@UI/Button";
import Card from "@UI/Card";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { useStore } from '@/shared/stores/context';
import type { Product } from "@/shared/types/product";
import Quantity from './components/Quantity/Quantity';
import Price from './components/Price/Price';


type ProductProps = {
  product: Product;
  image: string;
  discountedPrice: string | null;
  inCart: boolean;
  setToast: (msg: string) => void;
};

const Product: React.FC<ProductProps> = observer(({ product, image, discountedPrice, inCart, setToast }) => {
  const router = useRouter();
  const { cartStore, authStore } = useStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!authStore.isAuthenticated) {
      router.push('/register');
      return;
    }
    cartStore.addToCart(product, 1);
    setToast(`Product "${product.title}" added to cart`);
  };

  return (
    <div className={ps.wrapper}>
      {discountedPrice && product.discountPercent && (
        <span className={ps.badge}>−{product.discountPercent}%</span>
      )}
      <Card
        image={image}
        captionSlot={
          <span className={s.caption}>
            {product.productCategory?.title}
            <span className={s.rating}>⭐ {product.rating}</span>
          </span>
        }
        title={product.title}
        subtitle={product.description}
        contentSlot={
          <span className={s.price}>
            {discountedPrice ? (
              <Price price={product.price} discountPercent={product.discountPercent} />
            ) : (
              <span>${product.price}</span>
            )}
          </span>
        }
        onClick={() => router.push(`/product/${product.documentId}`)}
        actionSlot={
          inCart ? (
            <Quantity product={product} cartStore={cartStore} setToast={setToast} />
          ) : (
            <Button onClick={handleAddToCart}>
              Add to Cart
            </Button>
          )
        }
      />
    </div>
  )
})

export default Product