import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import s from "./ProductPage.module.scss";
import ChangedProduct from "./components/ChangedProduct";
import RelatedProducts from "./components/RelatedProducts";
// import { useProductPage } from "./hook/useProductPage";
import { productStore } from "@/stores/ProductStore";
import { useParams } from "react-router-dom";

import Loader from "@/components/UI/Loader";
import { useEffect } from "react";

const ProductPage = observer(() => {
  const navigate = useNavigate();
  const { documentId } = useParams<{ documentId: string }>();

  useEffect(() => {
    if (documentId) {
      productStore.fetchProduct(documentId);
    }
  }, [documentId]);
  
  const product = productStore.product;
  const relatedProducts = productStore.relatedProducts;
  const relatedLoading = productStore.relatedLoading;
  const loading = productStore.loading;
  const countRelated = productStore.countRelated;

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
      <button className={s.back} onClick={() => navigate(-1)}>
        ← Назад
      </button>
      <ChangedProduct product={product} image={image} />
      <RelatedProducts
        relatedProducts={relatedProducts}
        navigate={navigate}
        isLoading={relatedLoading}
        countRelated={countRelated}
        countRelatedIncrement={productStore.countRelatedIncrement}
      />
    </div>
  );
});

export default ProductPage;
