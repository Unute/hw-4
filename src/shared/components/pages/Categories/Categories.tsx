'use client'

import Loader from "@UI/Loader";
import { ProductListStore } from "@stores/ProductListStore";
import { observer, useLocalObservable } from "mobx-react-lite";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Option } from "@UI/MultiDropdown";

import s from "./Categories.module.scss";

type CategoriesProps = {
  initialCategories?: Option[];
};

const Categories = observer(({ initialCategories }: CategoriesProps) => {
  const productListStore = useLocalObservable(() => new ProductListStore());
  const router = useRouter();

  useEffect(() => {
    if (initialCategories && initialCategories.length > 0) {
      productListStore.categories = initialCategories;
    } else {
      productListStore.fetchCategories();
    }
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