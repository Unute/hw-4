import FilterPanel from "./components/FilterPanel"
import MainText from "./components/MainText/MainText"
import Product from "./components/Product/Product"
import { useGetAllProduct } from "./hook/useGetAllProduct"
// import s from './AllProductPage.module.scss'


const AllProductPage = () => {
  const { total, products, loading } = useGetAllProduct()

  return (
    <>
      <MainText />
      <FilterPanel total={total} />
      <Product products={products} loading={loading}/>
    </>
  )
}

export default AllProductPage