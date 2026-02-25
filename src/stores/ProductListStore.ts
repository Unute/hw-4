import { makeAutoObservable, runInAction } from "mobx";
import type { Product } from "@/types/product";
import { getAllProducts } from "@/api/getAllProducts";
import { toJS } from "mobx";

export class ProductListStore {

  constructor() {
    makeAutoObservable(this);
  }

  products: Product[] = [];
  total: number | undefined = undefined;
  loading: boolean = false;
  searchQuery: string = "";
  selectedCategories: string[] = [];
  currentPage: number = 1;
  pageSize: number = 9;



  //computed
  get totalPages() {
    return this.total ? Math.ceil(this.total / this.pageSize) : 0;

  }

  //actions
  setSearch(query: string) {
    this.searchQuery = query;
    this.currentPage = 1;
    this.fetchProducts();
  }

  setCategories(ids: string[]) {
    this.selectedCategories = ids;
    this.currentPage = 1;
    this.fetchProducts();
  }

  setPage = (page: number) => {
    this.currentPage = page;
    this.fetchProducts();
  }

  async fetchProducts() {
    this.loading = true;
    try {
      const response = await getAllProducts({
        search: this.searchQuery,
        categories: this.selectedCategories,
        page: this.currentPage,
        pageSize: this.pageSize,
      });
      runInAction(() => {
        this.products = response.data;
        this.total = response.meta.pagination.total;
      });
    } catch (e) {
      runInAction(() => {
        this.products = [];
        this.total = 0;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
        console.log(toJS(this.products));

      });
    }
  }
}



export const productListStore = new ProductListStore();