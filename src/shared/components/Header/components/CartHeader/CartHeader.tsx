'use client';

// import { NavLink } from "react-router-dom";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import s from "./../../Header.module.scss";
import { useStore } from "@stores/context";

const CartHeader = observer(() => {
  const { cartStore } = useStore();
  return (
    <Link
      href="/cart"
      className={`${s.cartLink} ${cartStore.totalCount > 0 ? s.hasItems : ""}`}
    >
      <img src="/svg/bag.svg" alt="Корзина" />
      {cartStore.totalCount > 0 && (
        <span className={s.badge}>{cartStore.totalCount}</span>
      )}
    </Link>
  )
})

export default CartHeader