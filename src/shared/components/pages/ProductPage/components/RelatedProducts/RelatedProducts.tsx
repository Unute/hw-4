import s from "./RelatedProducts.module.scss";
import Button from "@UI/Button";
import Card from "@UI/Card";
import Loader from "@UI/Loader";
import type { Product } from "@/shared/types/product";
import { observer } from "mobx-react-lite";


type RelatedProductsProps = {
  relatedProducts: Product[] | undefined;
  navigate: (path: string) => void;
  isLoading?: boolean;
  countRelated?: number;
  countRelatedIncrement?: () => void;
};

const RelatedProducts: React.FC<RelatedProductsProps> = observer(
  ({relatedProducts, navigate, isLoading, countRelated, countRelatedIncrement}) => {


  return (
    <div>
      <h2 className={s.title}>Related Products</h2>
      <div className={s.related}>
        {isLoading ? (
          <Loader size="l" />
        ) : (
          relatedProducts?.slice(0, countRelated).map((product) => {
            const image = product.images[0].url;
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
          })
        )}
      </div>

      <Button onClick={countRelatedIncrement} className={s.button}>More</Button>
    </div>
  );
});

export default RelatedProducts;
