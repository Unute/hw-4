'use client'

import Loader from "@UI/Loader";
import { ProductListStore } from "@stores/ProductListStore";
import { observer, useLocalObservable } from "mobx-react-lite";
import { useEffect } from "react";

const Categories = observer(() => {
  const productListStore = useLocalObservable(() => new ProductListStore());

  useEffect(() => {
    productListStore.fetchCategories();
  }, [])

  
  if(productListStore.categories.length === 0) {
    return <Loader size="l" />
  }
  
  return (
    <>
      {productListStore.categories.map((cat, id) => {
        return <div key={id}>{cat.value}</div>
      })}
    </>
  )
})

export default Categories