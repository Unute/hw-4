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

  async fetchCart() {
    this.cartLoading = true;
    try {
      const data = await getCart();
      runInAction(() => { this.items = data; });
    } catch (e: any) {
      if (e?.status === 401 || e?.response?.status === 401) {
        this._rootStore.authStore.logout();
      }
      runInAction(() => { this.items = []; });
    } finally {
      runInAction(() => { this.cartLoading = false; });
    }
  }

  async addToCart(product: Product, quantity = 1) {
    const prev = [...this.items];
    runInAction(() => {
      const existing = this.items.find((i) => i.product.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        this.items.push({ product, quantity });
      }
    });
    try {
      await addToCart(product.id, quantity);
      const cartItems = await getCart();
      runInAction(() => { this.items = cartItems; });
    } catch {
      runInAction(() => { this.items = prev; });
    }
  }

  async removeFromCart(documentId: string) {
    const item = this.items.find((i) => i.product.documentId === documentId);
    if (!item) return;
    const prev = [...this.items];
    runInAction(() => {
      this.items = this.items.filter((i) => i.product.documentId !== documentId);
    });
    try {
      await apiRemoveFromCart(item.product.id, item.quantity);
      const cartItems = await getCart();
      runInAction(() => { this.items = cartItems; });
    } catch {
      runInAction(() => { this.items = prev; });
    }
  }

  async decreaseQuantity(documentId: string) {
    const item = this.items.find((i) => i.product.documentId === documentId);
    if (!item) return;
    const prev = [...this.items];
    runInAction(() => {
      if (item.quantity <= 1) {
        this.items = this.items.filter((i) => i.product.documentId !== documentId);
      } else {
        item.quantity -= 1;
      }
    });
    try {
      await apiRemoveFromCart(item.product.id, 1);
      const cartItems = await getCart();
      runInAction(() => { this.items = cartItems; });
    } catch {
      runInAction(() => { this.items = prev; });
    }
  }

  clearCart = async () => {
    if (this.items.length === 0) return;
    const prev = [...this.items];
    runInAction(() => { this.items = []; });
    try {
      await Promise.all(
        prev.map((item) => apiRemoveFromCart(item.product.id, item.quantity))
      );
    } catch {
      runInAction(() => { this.items = prev; });
    }
  }

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
