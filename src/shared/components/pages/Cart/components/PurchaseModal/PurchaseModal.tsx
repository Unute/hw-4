'use client'

import dynamic from 'next/dynamic';
import { observer } from 'mobx-react-lite';
import { useLocalObservable } from 'mobx-react-lite';
import Input from '@UI/Input';
import Button from '@UI/Button';
import Text from '@UI/Text';
import s from './PurchaseModal.module.scss';
import { useTranslations } from 'next-intl';
import { PurchaseFormStore } from './PurchaseFormStore';

const MapPicker = dynamic(() => import('./MapPicker'), { ssr: false });

type PurchaseModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
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

const PurchaseModal = observer(({ onConfirm, onCancel }: PurchaseModalProps) => {
  const store = useLocalObservable(() => new PurchaseFormStore());
  const t = useTranslations();

  const handleSubmit = () => {
    const valid = store.validate({
      name: t('checkout.errors.name'),
      address: t('checkout.errors.address'),
      card: t('checkout.errors.card'),
      expiry: t('checkout.errors.expiry'),
      cvv: t('checkout.errors.cvv'),
    });
    if (valid) onConfirm();
  };

  return (
    <div className={s.overlay} onClick={onCancel}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <Text view="p-20" weight="bold" className={s.title}>
          {t('checkout.title')}
        </Text>

        <div className={s.field}>
          <label className={s.label}>{t('checkout.fullName')}</label>
          <Input
            value={store.form.name}
            onChange={(v) => store.setField('name', v)}
            placeholder={t('checkout.namePlaceholder')}
          />
          {store.errors.name && <span className={s.error}>{store.errors.name}</span>}
        </div>

        <div className={s.field}>
          <label className={s.label}>{t('checkout.address')}</label>
          <div className={s.addressRow}>
            <Input
              value={store.form.address}
              onChange={(v) => store.setField('address', v)}
              placeholder={t('checkout.addressPlaceholder')}
            />
            <button className={s.mapBtn} onClick={() => store.setMapOpen(true)} type="button">
              {t('checkout.pickOnMap')}
            </button>
          </div>
          {store.errors.address && <span className={s.error}>{store.errors.address}</span>}
        </div>

        <div className={s.field}>
          <label className={s.label}>{t('checkout.cardNumber')}</label>
          <Input
            value={store.form.cardNumber}
            onChange={(v) => store.setField('cardNumber', formatCardNumber(v))}
            placeholder="0000 0000 0000 0000"
          />
          {store.errors.cardNumber && <span className={s.error}>{store.errors.cardNumber}</span>}
        </div>

        <div className={s.row}>
          <div className={s.field}>
            <label className={s.label}>{t('checkout.expiry')}</label>
            <Input
              value={store.form.expiry}
              onChange={(v) => store.setField('expiry', formatExpiry(v))}
              placeholder={t('checkout.expiryPlaceholder')}
            />
            {store.errors.expiry && <span className={s.error}>{store.errors.expiry}</span>}
          </div>
          <div className={s.field}>
            <label className={s.label}>{t('checkout.cvv')}</label>
            <Input
              value={store.form.cvv}
              onChange={(v) => store.setField('cvv', v.replace(/\D/g, '').slice(0, 3))}
              placeholder="•••"
            />
            {store.errors.cvv && <span className={s.error}>{store.errors.cvv}</span>}
          </div>
        </div>

        <div className={s.actions}>
          <Button onClick={onCancel}>{t('checkout.cancel')}</Button>
          <Button onClick={handleSubmit}>{t('checkout.confirm')}</Button>
        </div>
      </div>

      {store.mapOpen && (
        <MapPicker
          onSelect={(address) => {
            store.setField('address', address);
            store.setMapOpen(false);
          }}
          onClose={() => store.setMapOpen(false)}
          confirmLabel={t('checkout.mapConfirm')}
          cancelLabel={t('checkout.cancel')}
          loadingLabel={t('checkout.mapLoading')}
        />
      )}
    </div>
  );
});

export default PurchaseModal;
