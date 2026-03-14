import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProductPage from '@/shared/components/pages/ProductPage';
import { getProductById } from '@api/getProductById';
import { getProductsByCategory } from '@api/getProductCategory';
import Loader from '@/shared/UI/Loader';

type Props = { params: Promise<{ documentId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { documentId } = await params;
  try {
    const product = await getProductById(documentId);
    return {
      title: product.title,
      description: product.description?.slice(0, 150),
    };
  } catch {
    return { title: 'Товар' };
  }
}

export default async function page({ params }: Props) {
  const { documentId } = await params;

  // параллельная загрузка: товар + связанные товары
  const product = await getProductById(documentId).catch(() => null);

  if (!product) {
    notFound();
  }

  const relatedProductsResponse = product.productCategory?.documentId
    ? await getProductsByCategory(product.productCategory.documentId).catch(() => ({ data: [] }))
    : { data: [] };

  return (
    <Suspense fallback={<Loader size="l" />}>
      <ProductPage
        initialProduct={product}
        initialRelatedProducts={relatedProductsResponse.data}
      />
    </Suspense>
  );
}