import type { CartItem } from '../stores/CartStore';

const CART_URL = 'https://front-school-strapi.ktsdev.ru/api/cart';

function getAuthHeaders(): Record<string, string> {
  const jwt = typeof window !== 'undefined' ? localStorage.getItem('jwt') : null;
  return jwt ? { Authorization: `Bearer ${jwt}` } : {};
}

export type CartResponse = {
  data: CartItem[];
};

export const getCart = async (): Promise<CartItem[]> => {
  const res = await fetch(CART_URL, {
    headers: getAuthHeaders(),
    cache: 'no-store',
  });
  return res.json();
};

export const addToCart = async (productId: number, quantity: number = 1): Promise<CartItem[]> => {
  const res = await fetch(`${CART_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify({ product: productId, quantity }),
  });
  const json: CartResponse = await res.json();
  return json.data;
};

export const removeFromCart = async (productId: number, quantity: number = 1): Promise<CartItem[]> => {
  const res = await fetch(`${CART_URL}/remove`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify({ product: productId, quantity }),
  });
  const json: CartResponse = await res.json();
  return json.data;
};