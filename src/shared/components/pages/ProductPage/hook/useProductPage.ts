import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProductById } from "@/api/getProductById";
import { getProductsByCategory } from "@/api/getProductCategory";
import type { Product } from "@/types/product";

export const useProductPage = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[] | undefined>(
    undefined,
  );
  const [relatedLoading, setRelatedLoading] = useState(true);

  useEffect(() => {
    if (!documentId) return;
    setLoading(true);
    getProductById(documentId)
      .then((data) => {
        setProduct(data);
      })
      .finally(() => setLoading(false));
  }, [documentId]);

  useEffect(() => {
    if (!product?.productCategory?.documentId) return;
    setRelatedLoading(true);
    getProductsByCategory(product.productCategory.documentId)
      .then((data) => {
        setRelatedProducts(data.data);
      })
      .finally(() => setRelatedLoading(false));
  }, [product?.productCategory?.documentId]);

  return { loading, product, relatedProducts, relatedLoading };
};
