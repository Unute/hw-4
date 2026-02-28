import { makeAutoObservable } from "mobx";

export class RegisterStore {
  email: string = "";
  password: string = "";
  username: string = "";
  LoginMode: boolean = false;

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

  setLoginMode = (mode: boolean) => {
    this.LoginMode = mode;
  }


}