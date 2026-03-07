import { Suspense } from 'react'
import ProductPage from '@/shared/components/pages/ProductPage'

const page = () => {
  return (
    <Suspense>
      <ProductPage />
    </Suspense>
  )
}

export default page