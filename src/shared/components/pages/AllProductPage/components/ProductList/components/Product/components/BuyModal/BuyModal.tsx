'use client';

import React, { useState } from 'react';
import type { Product } from '@/shared/types/product';
import s from './BuyModal.module.scss';

type BuyModalProps = {
  product: Product;
  discountedPrice: string | null;
  onClose: () => void;
  onConfirm: (qty: number) => void;
};

const BuyModal: React.FC<BuyModalProps> = ({ product, discountedPrice, onClose, onConfirm }) => {
  const [qty, setQty] = useState(1);

  const unitPrice = discountedPrice ? parseFloat(discountedPrice) : product.price;
  const total = (unitPrice * qty).toFixed(2);

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <p className={s.title}>Оформление заказа</p>
        <p className={s.productName}>{product.title}</p>

        <div className={s.row}>
          <span className={s.label}>Количество:</span>
          <span className={s.counter}>
            <div
              className={`${s.counterBtn} ${qty <= 1 ? s.disabled : ''}`}
              onClick={() => setQty((q) => Math.max(1, q - 1))}
            >
              −
            </div>
            <span className={s.counterValue}>{qty}</span>
            <div className={s.counterBtn} onClick={() => setQty((q) => q + 1)}>
              +
            </div>
          </span>
        </div>

        <div className={s.row}>
          <span className={s.label}>Итого:</span>
          <span className={s.total}>${total}</span>
        </div>

        <div className={s.actions}>
          <button className={s.btnCancel} onClick={onClose}>
            Отмена
          </button>
          <button className={s.btnConfirm} onClick={() => onConfirm(qty)}>
            Купить
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyModal;
