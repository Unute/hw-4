import type { Product } from "@/shared/types/product";
import { makeAutoObservable, runInAction } from "mobx";
import { getProductById } from "@api/getProductById";
import { getProductsByCategory } from "@api/getProductCategory";

export class ProductStore {
  product: Product | null = null;
  loading: boolean = true;
  relatedProducts: Product[] | undefined = undefined;
  relatedLoading: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchProduct(documentId: string) {
    this.loading = true;
    try {
      const product = await getProductById(documentId);
      runInAction(() => {
        this.product = product;
      });
      // После загрузки товара — загружаем связанные товары
      if (product.productCategory && product.productCategory.documentId) {
        this.fetchRelated(product.productCategory.documentId);
      } else {
        runInAction(() => {
          this.relatedProducts = [];
          this.relatedLoading = false;
        });
      }
    } catch (e) {
      runInAction(() => {
        this.product = null;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async fetchRelated(categoryId: string) {
    this.relatedLoading = true;
    try {
      const response = await getProductsByCategory(categoryId);
      runInAction(() => {
        this.relatedProducts = response.data;
      });
    } catch (e) {
      runInAction(() => {
        this.relatedProducts = [];
      });
    } finally {
      runInAction(() => {
        this.relatedLoading = false;
      });
    }
  }
}

