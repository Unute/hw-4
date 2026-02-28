import { makeAutoObservable, runInAction } from "mobx";
import { register, login } from "@/api/JWT/auth";

const JWT_KEY = "jwt";

export class AuthStore {
  jwt: string | null = null;
  user: {
    id: number;
    username: string;
    email: string;
  } | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isAuthenticated() {
    return !!this.jwt;
  }

  init() {
    const jwt = localStorage.getItem(JWT_KEY);
    if (jwt) {
      this.jwt = jwt;
    }
  }

  async register(username: string, email: string, password: string) {
    this.loading = true;
    this.error = null;
    try {
      const res = await register({ username, email, password });
      runInAction(() => {
        this.jwt = res.jwt;
        this.user = res.user;
        localStorage.setItem(JWT_KEY, res.jwt);
      });
    } catch (e: any) {
      runInAction(() => {
        this.error = e?.response?.data?.error?.message ?? "Ошибка регистрации";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async login(identifier: string, password: string) {
    this.loading = true;
    this.error = null;
    try {
      const res = await login({ identifier, password });
      runInAction(() => {
        this.jwt = res.jwt;
        this.user = res.user;
        localStorage.setItem(JWT_KEY, res.jwt);
      });
    } catch (e: any) {
      runInAction(() => {
        this.error = e?.response?.data?.error?.message ?? "Ошибка входа";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  logout() {
    this.jwt = null;
    this.user = null;
    localStorage.removeItem(JWT_KEY);
  }
}