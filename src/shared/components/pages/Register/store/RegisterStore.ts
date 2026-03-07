import { makeAutoObservable } from "mobx";

export class RegisterStore {
  email: string = "";
  password: string = "";
  username: string = "";
  isRegister: boolean = false; // true = showing registration form

  constructor() {
    makeAutoObservable(this);
  }

  setEmail = (email: string) => {
    this.email = email;
  }

  setPassword = (password: string) => {
    this.password = password;
  }

  setUsername = (username: string) => {
    this.username = username;
  }

  setIsRegister = (mode: boolean) => {
    this.isRegister = mode;
  }
}
