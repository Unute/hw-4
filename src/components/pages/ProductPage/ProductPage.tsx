import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "@/api/getProductById";
import type { Product } from "@/types/product";
import Loader from "@/components/UI/Loader";
import Button from "@/components/UI/Button";
import Text from "@/components/UI/Text";
import s from './ProductPage.module.scss';

const ProductPage = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!documentId) return;
    setLoading(true);
    getProductById(documentId)
      .then((data) =>  {
        setProduct(data)
        console.log(data, 'одна сущность')
      })
      .finally(() => setLoading(false));
  }, [documentId]);

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

  const image = product.images?.[0]?.url || '';

  return (
    <div className={s.page}>
      <button className={s.back} onClick={() => navigate(-1)}>← Назад</button>
      <div className={s.content}>
        <img src={image} alt={product.title} className={s.image} />
        <div className={s.info}>
          <Text view="title" weight="bold">{product.title}</Text>
          {product.productCategory && (
            <Text view="p-14" color="secondary">{product.productCategory.title}</Text>
          )}
          <Text view="p-16" color="secondary" className={s.description}>{product.description}</Text>
          <Text view="p-20" weight="bold">${product.price}</Text>
          <Button>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage