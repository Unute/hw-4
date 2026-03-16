'use client'

import Loader from "@UI/Loader";
import { ProductListStore } from "@stores/ProductListStore";
import { observer, useLocalObservable } from "mobx-react-lite";
import { runInAction } from "mobx";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Option } from "@UI/MultiDropdown";

import s from "./Categories.module.scss";

type CategoriesProps = {
  initialCategories?: Option[];
};

const getCategoryImage = (categoryTitle: string): string => {
  const imageMap: Record<string, string> = {
    'Electronics': '/Categories/electronic-devices.jpg',
    'Shoes': '/Categories/shoes.jpg',
    'Furniture': '/Categories/firniture.jpg',
    'Miscellaneous': '/Categories/misc.jpg',
  };
  return imageMap[categoryTitle] || '';
};

const Categories = observer(({ initialCategories }: CategoriesProps) => {
  const productListStore = useLocalObservable(() => new ProductListStore());
  const router = useRouter();

  useEffect(() => {
    if (initialCategories && initialCategories.length > 0) {
      runInAction(() => {
        productListStore.categories = initialCategories;
        productListStore.categoriesLoaded = true;
      });
    } else {
      productListStore.fetchCategories();
    }
  }, []);

  if (productListStore.categories.length === 0) {
    return <Loader size="l" />;
  }

  return (
    <div className={s.categoriesContainer}>
      <h1 className={s.title}>Категории товаров</h1>
      <div className={s.categoryList}>
        {productListStore.categories.map((cat, id) => (
          <button
            className={s.categoryItem}
            key={id}
            onClick={() => router.push(`/?categories=${cat.key}`)}
            type="button"
            style={{
              backgroundImage: `url('${getCategoryImage(cat.value)}')`,
            }}
          >
            <span>{cat.value}</span>
          </button>
        ))}
      </div>
    </div>
  );
});

export default Categories;