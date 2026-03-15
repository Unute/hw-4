'use client'

import { useState } from 'react';
import Input from '@UI/Input';
import Button from '@UI/Button';
import Text from '@UI/Text';
import s from './PurchaseModal.module.scss';

type PurchaseModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
}

type FormState = {
  name: string;
  address: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

const formatCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
};

const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
};

const PurchaseModal = ({ onConfirm, onCancel }: PurchaseModalProps) => {
  const [form, setForm] = useState<FormState>({
    name: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const set = (field: keyof FormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = 'Enter your name';
    if (!form.address.trim()) newErrors.address = 'Enter your address';
    if (form.cardNumber.replace(/\s/g, '').length < 16) newErrors.cardNumber = 'Enter a valid card number';
    if (form.expiry.length < 5) newErrors.expiry = 'Enter expiry MM/YY';
    if (form.cvv.length < 3) newErrors.cvv = 'Enter CVV';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onConfirm();
  };

  return (
    <div className={s.overlay} onClick={onCancel}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <Text view="p-20" weight="bold" className={s.title}>
          Checkout
        </Text>

        <div className={s.field}>
          <label className={s.label}>Full name</label>
          <Input
            value={form.name}
            onChange={set('name')}
            placeholder="John Doe"
          />
          {errors.name && <span className={s.error}>{errors.name}</span>}
        </div>

        <div className={s.field}>
          <label className={s.label}>Delivery address</label>
          <Input
            value={form.address}
            onChange={set('address')}
            placeholder="123 Main St, City"
          />
          {errors.address && <span className={s.error}>{errors.address}</span>}
        </div>

        <div className={s.field}>
          <label className={s.label}>Card number</label>
          <Input
            value={form.cardNumber}
            onChange={(v) => set('cardNumber')(formatCardNumber(v))}
            placeholder="0000 0000 0000 0000"
          />
          {errors.cardNumber && <span className={s.error}>{errors.cardNumber}</span>}
        </div>

        <div className={s.row}>
          <div className={s.field}>
            <label className={s.label}>Expiry</label>
            <Input
              value={form.expiry}
              onChange={(v) => set('expiry')(formatExpiry(v))}
              placeholder="MM/YY"
            />
            {errors.expiry && <span className={s.error}>{errors.expiry}</span>}
          </div>
          <div className={s.field}>
            <label className={s.label}>CVV</label>
            <Input
              value={form.cvv}
              onChange={(v) => set('cvv')(v.replace(/\D/g, '').slice(0, 3))}
              placeholder="•••"
            />
            {errors.cvv && <span className={s.error}>{errors.cvv}</span>}
          </div>
        </div>

        <div className={s.actions}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSubmit}>Confirm purchase</Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
