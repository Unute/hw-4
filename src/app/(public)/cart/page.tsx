import type { Metadata } from "next";
import Cart from '@/shared/components/pages/Cart';

export const metadata: Metadata = {
  title: "Корзина",
  description: "Ваша корзина покупок — просмотрите выбранные товары.",
};

export default function page() {
  return (
    <Cart />
  )
}