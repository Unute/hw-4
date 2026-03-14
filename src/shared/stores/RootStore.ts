import { CartStore } from "./CartStore";
import { AuthStore } from "./AuthStore";
import { ThemeStore } from "./ThemeStore";

export class RootStore {
  cartStore: CartStore;
  authStore: AuthStore;
  themeStore: ThemeStore;

  constructor() {
    this.authStore = new AuthStore();
    this.cartStore = new CartStore(this);
    this.themeStore = new ThemeStore();
  }
}
