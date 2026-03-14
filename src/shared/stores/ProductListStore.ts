import { makeAutoObservable, runInAction } from "mobx";
import type { Product } from "@/shared/types/product";
import { getAllProducts } from "@api/getAllProducts";
import { getCategories } from "@api/getCategories";
import type { Option } from "@/shared/UI/MultiDropdown";

export class ProductListStore {
  constructor() {
    makeAutoObservable(this);
  }

  products: Product[] = [];
  total: number | undefined = undefined;
  loading: boolean = false;
  searchQuery: string = "";
  committedSearch: string = ""; // зафиксированный поиск (только при нажатии кнопки)
  selectedCategories: Option[] = []; // выбранные категории в формате MultiDropdown
  categories: Option[] = [];         // все доступные категории для MultiDropdown
  currentPage: number = 1;
  pageSize: number = 9;
  pendingCategoryKeys: string[] = []; // ключи категорий из URL, ждут загрузки списка категорий
  categoriesLoaded: boolean = false;  // флаг кэша — не запрашивать повторно
  sortField: "price" | "rating" | null = null;
  sortOrder: "asc" | "desc" | null = null;
  priceMin: string = "";
  priceMax: string = "";


  //computed
  get totalPages() {
    return this.total ? Math.ceil(this.total / this.pageSize) : 0;

  }

  //actions
  setSort = (field: "price" | "rating", order: "asc" | "desc") => {
    this.sortField = field;
    this.sortOrder = order;
    this.currentPage = 1;
    this.fetchProducts();
  }

  setPriceMin = (value: string) => {
    this.priceMin = value.replace(/[^0-9]/g, "");
    this.currentPage = 1;
    this.fetchProducts();
  }

  setPriceMax = (value: string) => {
    this.priceMax = value.replace(/[^0-9]/g, "");
    this.currentPage = 1;
    this.fetchProducts();
  }



  setSearch = (query: string) => {
    this.searchQuery = query;
    // Не сбрасываем страницу и не запускаем поиск при каждом символе
  }

  submitSearch = () => {
    this.committedSearch = this.searchQuery;
    this.currentPage = 1;
    this.fetchProducts();
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

  initFromParams = (params: { search: string; page: number; categoryKeys: string[] }) => {
    this.searchQuery = params.search;
    this.committedSearch = params.search;
    this.currentPage = params.page;
    this.pendingCategoryKeys = params.categoryKeys;
  }

  restoreCategoriesFromKeys = () => {
    if (this.pendingCategoryKeys.length > 0) {
      this.selectedCategories = this.categories.filter((c) =>
        this.pendingCategoryKeys.includes(c.key)
      );
      this.pendingCategoryKeys = [];
    }
  }


  async fetchProducts() {
    this.loading = true;
    try {
      const response = await getAllProducts({
        search: this.committedSearch,
        categories: this.selectedCategories.map((o) => o.key),
        page: this.currentPage,
        pageSize: this.pageSize,
        sort: this.sortField ? `${this.sortField}:${this.sortOrder}` : undefined,
        priceMin: this.priceMin ? Number(this.priceMin) : undefined,
        priceMax: this.priceMax ? Number(this.priceMax) : undefined,
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
      });
    }
  }


  async fetchCategories() {
    if (this.categoriesLoaded) return;
    try {
      const data = await getCategories();
      runInAction(() => {
        this.categories = data.map((c) => ({ key: c.documentId, value: c.title }));
        this.categoriesLoaded = true;
      });
    } catch (e) {
      runInAction(() => {
        this.categories = [];
      });
    }
  }
}



