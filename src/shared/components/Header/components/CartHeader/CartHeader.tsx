'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { observer } from "mobx-react-lite";
import s from "./CartHeader.module.scss";
import { useStore } from "@stores/context";

type CartHeaderProps = {
  showLabel?: boolean;
  onClose?: () => void;
};

const CartHeader = observer(({ showLabel, onClose }: CartHeaderProps) => {
  const { cartStore } = useStore();
  const pathname = usePathname();
  const isActive = pathname === "/cart";
  return (
    <Link
      href="/cart"
      className={`${s.cartLink} ${isActive ? s.active : ""} ${cartStore.totalCount > 0 ? s.hasItems : ""} ${showLabel ? s.withLabel : ""}`}
      onClick={onClose}
    >
      <img src="/svg/bag.svg" alt="Корзина" />
      {cartStore.totalCount > 0 && (
        <span className={s.badge}>{cartStore.totalCount}</span>
      )}
      {showLabel && <span className={s.label}>Корзина</span>}
    </Link>
  )
})

export default CartHeader