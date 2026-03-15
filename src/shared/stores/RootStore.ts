import { CartStore } from "./CartStore";
import { AuthStore } from "./AuthStore";
import { ThemeStore } from "./ThemeStore";
import { PurchaseStore } from "./PurchaseStore";

export class RootStore {
  cartStore: CartStore;
  authStore: AuthStore;
  themeStore: ThemeStore;
  purchaseStore: PurchaseStore;

  constructor() {
    this.authStore = new AuthStore();
    this.cartStore = new CartStore(this);
    this.themeStore = new ThemeStore();
    this.purchaseStore = new PurchaseStore(this);
  }
}
