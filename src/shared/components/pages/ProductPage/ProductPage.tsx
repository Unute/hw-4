'use client';

import { useRouter, useParams } from "next/navigation";
import { observer, useLocalObservable } from "mobx-react-lite";
import s from "./ProductPage.module.scss";
import ChangedProduct from "./components/ChangedProduct";
import RelatedProducts from "./components/RelatedProducts";
import { useEffect, useMemo } from "react";
import { RelatedCountStore } from "./store/RelatedCountStore";
import { ProductStore } from "@stores/ProductStore";

import Loader from "@UI/Loader";

const ProductPage = observer(() => {
  const router = useRouter();
  const params = useParams();
  const documentId = params.documentId as string;
  const productStore = useLocalObservable(() => new ProductStore());
  const relatedCountStore = useMemo(() => new RelatedCountStore(), []);

  useEffect(() => {
    if (documentId) {
      relatedCountStore.reset();
      productStore.fetchProduct(documentId);
    }
  }, [documentId]);
  
  const product = productStore.product;
  const relatedProducts = productStore.relatedProducts;
  const relatedLoading = productStore.relatedLoading;
  const loading = productStore.loading;
  const countRelated = relatedCountStore.countRelated;

  if (loading) {
    return (
      <div className={s.loader}>
        <Loader size="l" />
      </div>
    );
  }

  if (!product) {
    return <div className={s.notFound}>Товар не найден</div>;
  }


  const image = product.images[0].url || "";

  return (
    <div className={s.page}>
      <button className={s.back} onClick={() => router.back()}>
        ← Назад
      </button>
      <ChangedProduct product={product} image={image} />
      <RelatedProducts
        relatedProducts={relatedProducts}
        navigate={(path) => router.push(path)}
        isLoading={relatedLoading}
        countRelated={countRelated}
        countRelatedIncrement={relatedCountStore.increment}
      />
    </div>
  );
});

export default ProductPage;
