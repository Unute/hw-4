import { makeAutoObservable, reaction, runInAction } from "mobx";
import type { Product } from "@/shared/types/product";
import type { RootStore } from "./RootStore";
import { getCart, addToCart, removeFromCart as apiRemoveFromCart } from "@api/CartApi";

export type CartItem = {
  product: Product;
  quantity: number;
};

export class CartStore {
  _rootStore: RootStore;
  items: CartItem[] = [];
  cartLoading: boolean = false;

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
    makeAutoObservable(this, { _rootStore: false });

    reaction(
      () => rootStore.authStore.jwt,
      (jwt) => {
        if (jwt) this.fetchCart();
        else this.items = [];
      },
      { fireImmediately: true }
    );
  }

  // загрузить корзину с сервера
  async fetchCart() {
    this.cartLoading = true;
    try {
      const data = await getCart();
      runInAction(() => {
        this.items = data;
      });
    } catch {
      runInAction(() => { this.items = []; });
    } finally {
      runInAction(() => { this.cartLoading = false; });
    }

  }

  // добавить товар (через API)
  async addToCart(productId: number, quantity = 1) {
    this.cartLoading = true;
    try {
      await addToCart(productId, quantity);
      const cartItems = await getCart();
      runInAction(() => {
        this.items = cartItems;
      });
    } finally {
      runInAction(() => { this.cartLoading = false; });
    }
  }

  // удалить товар полностью (через API)
  async removeFromCart(documentId: string) {
    const item = this.items.find((i) => i.product.documentId === documentId);
    if (!item) return;
    this.cartLoading = true;
    try {
      await apiRemoveFromCart(item.product.id, item.quantity);
      const cartItems = await getCart();
      runInAction(() => {
        this.items = cartItems;
      });
    } finally {
      runInAction(() => { this.cartLoading = false; });
    }
  }

  // уменьшить на 1 (через API)
  async decreaseQuantity(documentId: string) {
    const item = this.items.find((i) => i.product.documentId === documentId);
    if (!item) return;
    this.cartLoading = true;
    try {
      await apiRemoveFromCart(item.product.id, 1);
      const cartItems = await getCart();
      runInAction(() => {
        this.items = cartItems;
      });
    } finally {
      runInAction(() => { this.cartLoading = false; });
    }
  }

  clearCart = async () => {
    if (this.items.length === 0) return;
    this.cartLoading = true;
    try {
      const snapshot = [...this.items];
      await Promise.all(
        snapshot.map((item) => apiRemoveFromCart(item.product.id, item.quantity))
      );
      runInAction(() => {
        this.items = [];
      });
    } finally {
      runInAction(() => {
        this.cartLoading = false;
      });
    }
  }

  // computed
  get totalCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice(): number {
    return this.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  isInCart = (documentId: string): boolean => {
    return this.items.some((item) => item.product.documentId === documentId);
  };
}