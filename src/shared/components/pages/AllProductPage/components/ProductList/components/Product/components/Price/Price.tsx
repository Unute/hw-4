import React from "react";
import s from "./Price.module.scss";

type PriceProps = {
  price: number;
  discountPercent?: number | null;
};

const Price: React.FC<PriceProps> = ({ price, discountPercent }) => {


  return (
    <>
      <span className={s.priceDiscounted}>${discountPercent}</span>
      <span className={s.priceOriginal}>${price}</span>
      <span className={s.discountBadge}>-{discountPercent}%</span>
    </>
  )
}

export default Price;