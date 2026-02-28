import { CartStore } from "./CartStore";
import { ProductListStore } from "./ProductListStore";
import { ProductStore } from "./ProductStore";
import { AuthStore } from "./AuthStore";

export class RootStore {
  cartStore: CartStore;
  productListStore: ProductListStore;
  productStore: ProductStore;
  authStore: AuthStore;


  constructor() {
    this.cartStore = new CartStore(this);
    this.productListStore = new ProductListStore(this);
    this.productStore = new ProductStore(this);
    this.authStore = new AuthStore();
  }
}
