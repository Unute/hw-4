import type { Metadata } from "next";
import { getCategories } from "@api/getCategories";
import type { ProductCategory } from "@/shared/types/productCategory";
import Categories from "@/shared/components/pages/Categories";

export const metadata: Metadata = {
  title: "Категории",
  description: "Все категории товаров магазина Lalasia.",
};

export default async function page() {
  const rawCategories: ProductCategory[] = await getCategories();
  const initialCategories = rawCategories.map((cat) => ({
    key: cat.documentId,
    value: cat.title,
  }));

  return (
    <div>
      <Categories initialCategories={initialCategories} />
    </div>
  );
}