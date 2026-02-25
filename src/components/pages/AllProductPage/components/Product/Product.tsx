import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import s from "./Product.module.scss";
import Pagination from "./components/Pagination";
import type { ProductProps } from "./types";
import Card from "@/components/UI/Card";
import Loader from "@/components/UI/Loader";
import { productListStore } from "@/stores/ProductListStore";

const Product: React.FC<ProductProps> = observer(({ products, loading }) => {
  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <div className={s.loader}>
          <Loader size="l" />
        </div>
      ) : (
        <>
          <div className={s.grid}>
            {products.map((product) => {
              const image: string = product.images[0].url;
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
              );
            })}
          </div>
          <Pagination
            currentPage={productListStore.currentPage}
            totalPages={productListStore.totalPages}
            onPageChange={productListStore.setPage}
          />
        </>
      )}
    </>
  );
});

export default Product;
