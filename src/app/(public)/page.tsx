import { Suspense } from "react";
import type { Metadata } from "next";
import AllProductPage from "@/shared/components/pages/AllProductPage";
import { getAllProducts } from "@api/getAllProducts";
import { getCategories } from "@api/getCategories";
import Loader from "@UI/Loader";

export const metadata: Metadata = {
  title: "Каталог товаров",
  description: "Все товары магазина Lalasia — фильтрация, поиск, корзина.",
};

async function AllProductPageLoader() {
  const [productsResponse, rawCategories] = await Promise.all([
    getAllProducts({ page: 1 }).catch(() => ({ data: [], meta: { pagination: { total: 0 } } })),
    getCategories().catch(() => []),
  ]);

  const initialCategories = rawCategories.map((cat) => ({
    key: cat.documentId,
    value: cat.title,
  }));

  return (
    <AllProductPage
      initialProducts={productsResponse.data}
      initialCategories={initialCategories}
      initialTotal={productsResponse.meta.pagination.total}
    />
  );
}

export default function PublicPage() {
  return (
    <Suspense
      fallback={
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", padding: "4rem 0" }}>
          <Loader size="l" />
        </div>
      }
    >
      <AllProductPageLoader />
    </Suspense>
  );
}
