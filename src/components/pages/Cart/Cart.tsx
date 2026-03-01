import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/stores/context";
import Button from "@/components/UI/Button";
import Text from "@/components/UI/Text";
import s from "./Cart.module.scss";

const Cart = observer(() => {
  const navigate = useNavigate();
  const { cartStore } = useStore();
  const { authStore } = useStore();

  if (cartStore.items.length === 0 && authStore.isAuthenticated) {
    return (
      <div className={s.empty}>
        <Text view="title">Your cart is empty</Text>
        <Button onClick={() => navigate("/")}>Go to catalog</Button>
      </div>
    );
  }

  return (
    <div className={s.cart}>
      <Text view="title" weight="bold" className={s.title}>
        Cart
      </Text>
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
      <div className={s.footer}>
        <Text view="p-20" weight="bold">
          Total: ${cartStore.totalPrice}
        </Text>
        <Button onClick={cartStore.clearCart}>Clear cart</Button>
      </div>
    </div>
  );
});

export default Cart;