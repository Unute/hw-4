'use client'

import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useStore } from "@stores/context";
import Button from "@UI/Button";
import Text from "@UI/Text";
import s from "./Cart.module.scss";
import CartList from './components/CartList'

const Cart = observer(() => {
  const router = useRouter();
  const { cartStore } = useStore();
  const { authStore } = useStore();

  if (cartStore.items.length === 0 && authStore.isAuthenticated) {
    return (
      <div className={s.empty}>
        <Text view="title">Your cart is empty</Text>
        <Button onClick={() => router.push("/")}>Go to catalog</Button>
      </div>
    );
  } else if (!authStore.isAuthenticated) {
    return (
      <div className={s.empty}>
        <Text view="title">Log in to your account</Text>
        <Button className={s.ButtonRegister} onClick={() => router.push("/register")}>Log in</Button>
      </div>
    )
  }

  return (
    <div className={s.cart}>
      <Text view="title" weight="bold" className={s.title}>
        Cart
      </Text>
      <CartList />
      <div className={s.footer}>
        <Text view="p-20" weight="bold">
          Total: ${cartStore.totalPrice}
        </Text>
        <Button onClick={cartStore.clearCart}>Clear cart</Button>
      </div>
    </div>
  );
});

export default Cart;