import { makeAutoObservable, runInAction } from "mobx";
import type { Product } from "@/types/product";
import { getAllProducts } from "@/api/getAllProducts";
import { toJS } from "mobx";
import type { Option } from "@/components/UI/MultiDropdown";

export class ProductListStore {

  constructor() {
    makeAutoObservable(this);
  }

  products: Product[] = [];
  total: number | undefined = undefined;
  loading: boolean = false;
  searchQuery: string = "";
  selectedCategories: Option[] = []; // выбранные категории в формате MultiDropdown
  categories: Option[] = [];         // все доступные категории для MultiDropdown
  currentPage: number = 1;
  pageSize: number = 9;



  //computed
  get totalPages() {
    return this.total ? Math.ceil(this.total / this.pageSize) : 0;

  }

  //actions
  setSearch = (query: string) => {
    this.searchQuery = query;
    this.currentPage = 1;
  }

  // принимает Option[] — это то, что передаёт MultiDropdown при выборе
  setCategories = (options: Option[]) => {
    this.selectedCategories = options;
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
        // передаём массив key (documentId категории) для фильтрации
        categories: this.selectedCategories.map((o) => o.key),
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

  
  async fetchCategories() {
    try {
      const response = await getAllProducts({ pageSize: 1000 });
      runInAction(() => {
        const unique = new Map<string, string>();
        response.data.forEach((p) => {
          if (p.productCategory) {
            unique.set(p.productCategory.documentId, p.productCategory.title);
          }
        });
        this.categories = Array.from(unique.entries()).map(([key, value]) => ({ key, value }));
      });
    } catch (e) {
      runInAction(() => {
        this.categories = [];
      });
    }
  }
}



export const productListStore = new ProductListStore();