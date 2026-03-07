'use client'

import Loader from "@UI/Loader";
import { ProductListStore } from "@stores/ProductListStore";
import { observer, useLocalObservable } from "mobx-react-lite";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import s from "./Categories.module.scss";

const Categories = observer(() => {
  const productListStore = useLocalObservable(() => new ProductListStore());
  const router = useRouter();

  useEffect(() => {
    productListStore.fetchCategories();
  }, []);

  if (productListStore.categories.length === 0) {
    return <Loader size="l" />;
  }

  return (
    <div className={s.categoriesContainer}>
      <div className={s.title}>Категории товаров</div>
      <div className={s.categoryList}>
        {productListStore.categories.map((cat, id) => (
          <div
            className={s.categoryItem}
            key={id}
            onClick={() => router.push(`/?categories=${cat.key}`)}
          >
            {cat.value}
          </div>
        ))}
      </div>
    </div>
  );
});

export default Categories;