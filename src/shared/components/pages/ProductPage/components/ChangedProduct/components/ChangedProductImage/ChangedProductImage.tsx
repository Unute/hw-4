'use client'

import React, { useRef, useState } from 'react'
import { observer } from 'mobx-react-lite';
import s from './ChangedProductImage.module.scss';
import { Product, ProductImage } from '@/shared/types/product';

type ChangedProductImageProps = {
  image: ProductImage[];
  product: Product;
}

const SWIPE_THRESHOLD = 50;

const ChangedProductImage: React.FC<ChangedProductImageProps> = observer(({image, product}) => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const incrementImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % image.length);
  }

  const decrementImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + image.length) % image.length);
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (delta > SWIPE_THRESHOLD) incrementImage();
    else if (delta < -SWIPE_THRESHOLD) decrementImage();
    touchStartX.current = null;
  };

  return (
    <div
      className={s.imageContainer}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button className={s.leftBtn} onClick={decrementImage}>
        {"<"}
      </button>
      <img src={image[currentImageIndex]?.url} alt={product.title} className={s.image} />
      <button className={s.rightBtn} onClick={incrementImage}>
        {">"}
      </button>
    </div>
  )
})

export default ChangedProductImage
