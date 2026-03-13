import { makeAutoObservable } from "mobx";

export class ThemeStore {
  isDark: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  init() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setDark(saved === 'dark' || (!saved && prefersDark));
  }

  setDark(value: boolean) {
    this.isDark = value;
    localStorage.setItem('theme', value ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', value ? 'dark' : 'light');
  }

  toggle() {
    this.setDark(!this.isDark);
  }
}
