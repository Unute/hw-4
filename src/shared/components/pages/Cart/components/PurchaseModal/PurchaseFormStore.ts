import { makeAutoObservable } from 'mobx';

type FormState = {
  name: string;
  address: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
};

type FormErrors = Partial<FormState>;

export class PurchaseFormStore {
  form: FormState = {
    name: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  };

  errors: FormErrors = {};
  mapOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  setField(field: keyof FormState, value: string) {
    this.form[field] = value;
  }

  setMapOpen(open: boolean) {
    this.mapOpen = open;
  }

  validate(msgs: { name: string; address: string; card: string; expiry: string; cvv: string }): boolean {
    const errors: FormErrors = {};
    if (!this.form.name.trim()) errors.name = msgs.name;
    if (!this.form.address.trim()) errors.address = msgs.address;
    if (this.form.cardNumber.replace(/\s/g, '').length < 16) errors.cardNumber = msgs.card;
    if (this.form.expiry.length < 5) errors.expiry = msgs.expiry;
    if (this.form.cvv.length < 3) errors.cvv = msgs.cvv;
    this.errors = errors;
    return Object.keys(errors).length === 0;
  }
}
