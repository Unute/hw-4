'use client'

import { observer } from 'mobx-react-lite'
import { useStore } from '@stores/context'
import Text from '@UI/Text'
import s from './CartList.module.scss'


const CartList = observer(() => {
  const { cartStore } = useStore();


  return (
    <div className={s.items}>
      {cartStore.items.map(({ product, quantity }) => (
        <div key={product.documentId} className={s.item}>
          <img
            src={product.images[0].url}
            alt={product.title}
            className={s.image}
          />
          <div className={s.info}>
            <Text weight="bold">{product.title}</Text>
            <Text color="secondary">${product.price}</Text>
          </div>
          <div className={s.controls}>
            <button
              className={s.qty}
              onClick={() => cartStore.decreaseQuantity(product.documentId)}
            >
              −
            </button>
            <Text>{quantity}</Text>
            <button
              className={s.qty}
              onClick={() => cartStore.addToCart(product.id)}
            >
              +
            </button>
          </div>
          <Text weight="bold" className={s.subtotal}>
            ${product.price * quantity}
          </Text>
          <button
            className={s.remove}
            onClick={() => cartStore.removeFromCart(product.documentId)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
})

export default CartList