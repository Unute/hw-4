'use client'

import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useStore } from "@stores/context";
import Button from "@UI/Button";
import Text from "@UI/Text";
import s from "./Cart.module.scss";
import CartList from './components/CartList';
import PurchaseModal from './components/PurchaseModal/PurchaseModal';

const Cart = observer(() => {
  const router = useRouter();
  const { cartStore, authStore, purchaseStore } = useStore();
  const [toast, setToast] = useState<string | null>(null);
  const [purchaseTarget, setPurchaseTarget] = useState<'all' | string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleConfirmPurchase = async () => {
    if (!purchaseTarget) return;
    if (purchaseTarget === 'all') {
      purchaseStore.recordPurchase([...cartStore.items]);
      setToast('Successfully purchased all items!');
      await cartStore.clearCart();
    } else {
      const item = cartStore.items.find((i) => i.product.documentId === purchaseTarget);
      if (item) purchaseStore.recordPurchase([item]);
      setToast(`Successfully purchased "${item?.product.title}"!`);
      await cartStore.removeFromCart(purchaseTarget);
    }
    setPurchaseTarget(null);
  };

  if (!authStore.isAuthenticated) {
    return (
      <div className={s.empty}>
        <Text view="title">Log in to your account</Text>
        <Button className={s.ButtonRegister} onClick={() => router.push("/register")}>Log in</Button>
      </div>
    )
  }

  if (cartStore.items.length === 0) {
    return (
      <>
        {toast && <div className={s.toast}>{toast}</div>}
        <div className={s.empty}>
          <Text view="title">Your cart is empty</Text>
          <Button onClick={() => router.push("/")}>Go to catalog</Button>
        </div>
      </>
    );
  }

  return (
    <div className={s.cart}>
      {toast && <div className={s.toast}>{toast}</div>}
      {purchaseTarget && (
        <PurchaseModal
          onConfirm={handleConfirmPurchase}
          onCancel={() => setPurchaseTarget(null)}
        />
      )}
      <Text view="title" weight="bold" className={s.title}>
        Cart
      </Text>
      <CartList onBuyOne={(documentId) => setPurchaseTarget(documentId)} />
      <div className={s.footer}>
        <Text view="p-20" weight="bold">
          Total: ${cartStore.totalPrice}
        </Text>
        <div className={s.footerActions}>
          <Button onClick={cartStore.clearCart}>Clear cart</Button>
          <Button onClick={() => setPurchaseTarget('all')}>Buy All</Button>
        </div>
      </div>
    </div>
  );
});

export default Cart;
