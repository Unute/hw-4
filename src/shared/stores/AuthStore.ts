import { makeAutoObservable, runInAction } from "mobx";
import { register, login } from "@api/JWT/auth";

const JWT_KEY = "jwt";
const USER_KEY = "user"; // serialized user object

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
    if (typeof window === "undefined") return;
    const jwt = localStorage.getItem(JWT_KEY);
    const userJson = localStorage.getItem(USER_KEY);
    if (jwt) {
      this.jwt = jwt;
    }
    if (userJson) {
      try {
        this.user = JSON.parse(userJson);
      } catch {
        this.user = null;
      }
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
        if (typeof window !== "undefined") {
          localStorage.setItem(JWT_KEY, res.jwt);
          localStorage.setItem(USER_KEY, JSON.stringify(res.user));
        }
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
        if (typeof window !== "undefined") {
          localStorage.setItem(JWT_KEY, res.jwt);
          localStorage.setItem(USER_KEY, JSON.stringify(res.user));
        }
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
    if (typeof window !== "undefined") {
      localStorage.removeItem(JWT_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }
}