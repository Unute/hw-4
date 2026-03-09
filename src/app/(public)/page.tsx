import { Suspense } from "react";
import type { Metadata } from "next";
import AllProductPage from "@/shared/components/pages/AllProductPage";
import { getAllProducts } from "@api/getAllProducts";
import { getCategories } from "@api/getCategories";

export const metadata: Metadata = {
  title: "Каталог товаров",
  description: "Все товары магазина Lalasia — фильтрация, поиск, корзина.",
};

export default async function PublicPage() {
  // Параллельная загрузка: первая страница товаров + категории для фильтра
  const [productsResponse, rawCategories] = await Promise.all([
    getAllProducts({ page: 1 }).catch(() => ({ data: [], meta: { pagination: { total: 0 } } })),
    getCategories().catch(() => []),
  ]);

  const initialCategories = rawCategories.map((cat) => ({
    key: cat.documentId,
    value: cat.title,
  }));

  return (
    <Suspense>
      <AllProductPage
        initialProducts={productsResponse.data}
        initialCategories={initialCategories}
        initialTotal={productsResponse.meta.pagination.total}
      />
    </Suspense>
  );
}
