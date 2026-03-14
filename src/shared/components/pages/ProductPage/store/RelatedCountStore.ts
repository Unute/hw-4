import { makeAutoObservable } from "mobx";

export class RelatedCountStore {
  countRelated: number = 3;

  constructor() {
    makeAutoObservable(this);
  }

  increment = () => {
    this.countRelated += 3;
  };

  reset = () => {
    this.countRelated = 3;
  };
}
