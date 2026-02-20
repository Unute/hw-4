import { useNavigate } from "react-router-dom"
import Card from "@/components/UI/Card"
import Loader from "@/components/UI/Loader"
import s from './Product.module.scss'
import type { ProductProps } from "./types"

const Product = ({ products, loading }: ProductProps) => {
  const navigate = useNavigate()

  return (
    <>
      {loading ? (
        <div className={s.loader}>
          <Loader size='l' />
        </div>
      ) : (
        <div className={s.grid}>
          {products.map((product) => {
            const image = product.images?.[0].url
            return (
              <Card
                key={product.documentId}
                image={image}
                captionSlot={product.productCategory?.title}
                title={product.title}
                subtitle={product.description}
                contentSlot={`$${product.price}`}
                onClick={() => navigate(`/product/${product.documentId}`)}
              />
            )
          })}
        </div>
      )}
    </>
  )
}

export default Product