import React from 'react'
import { observer } from "mobx-react-lite";
import type { Product } from "@/shared/types/product";
import type { CartStore } from "@/shared/stores/CartStore";
import s from './Quantity.module.scss';


type QuantityProps = {
  product: Product;
  cartStore: CartStore;
  setToast: (msg: string) => void;
}

const Quantity = observer(({product, cartStore, setToast}: QuantityProps) => {
  return (
    <span className={s.quantityControl}>
      <div
        className={s.quantityBtn}
        onClick={(e) => {
          e.stopPropagation();
          const item = cartStore.items.find((i) => i.product.documentId === product.documentId);
          if (item && item.quantity > 1) {
            cartStore.decreaseQuantity(product.documentId);
          } else {
            cartStore.removeFromCart(product.documentId);
            setToast(`Product "${product.title}" removed from cart`);
          }
        }}
      >−</div>
      <span className={s.quantityValue}>
        {cartStore.items.find((i) => i.product.documentId === product.documentId)?.quantity ?? 1}
      </span>
      <div
        className={s.quantityBtn}
        onClick={(e) => {
          e.stopPropagation();
          cartStore.addToCart(product, 1);
        }}
      >+</div>
    </span>
  )
})

export default Quantity