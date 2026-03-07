import { CartStore } from "./CartStore";
import { AuthStore } from "./AuthStore";

export class RootStore {
  cartStore: CartStore;
  authStore: AuthStore;


  constructor() {
    this.authStore = new AuthStore();
    this.cartStore = new CartStore(this);
  }
}
