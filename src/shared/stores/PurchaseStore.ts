import { makeAutoObservable, reaction, runInAction } from "mobx";
import { CartItem } from "./CartStore";
import type { RootStore } from "./RootStore";

type PurchaseStats = { totalItems: number; totalSpent: number };

const storageKey = (userId: number) => `purchase_stats_${userId}`;

export class PurchaseStore {
  _rootStore: RootStore;
  totalItems: number = 0;
  totalSpent: number = 0;

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
    makeAutoObservable(this, { _rootStore: false });

    reaction(
      () => rootStore.authStore.user,
      (user) => {
        if (user) this.loadForUser(user.id);
        else this.reset();
      },
      { fireImmediately: true }
    );
  }

  loadForUser(userId: number) {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(storageKey(userId));
      const stats: PurchaseStats = raw ? JSON.parse(raw) : { totalItems: 0, totalSpent: 0 };
      runInAction(() => {
        this.totalItems = stats.totalItems ?? 0;
        this.totalSpent = stats.totalSpent ?? 0;
      });
    } catch {
      runInAction(() => {
        this.totalItems = 0;
        this.totalSpent = 0;
      });
    }
  }

  recordPurchase(items: CartItem[]) {
    const addItems = items.reduce((sum, { quantity }) => sum + quantity, 0);
    const addSpent = items.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);
    this.totalItems += addItems;
    this.totalSpent = parseFloat((this.totalSpent + addSpent).toFixed(2));
    const userId = this._rootStore.authStore.user?.id;
    if (userId !== undefined && typeof window !== 'undefined') {
      localStorage.setItem(storageKey(userId), JSON.stringify({
        totalItems: this.totalItems,
        totalSpent: this.totalSpent,
      }));
    }
  }

  reset() {
    this.totalItems = 0;
    this.totalSpent = 0;
  }
}
