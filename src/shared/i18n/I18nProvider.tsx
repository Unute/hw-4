'use client';

import { observer } from 'mobx-react-lite';
import { NextIntlClientProvider } from 'next-intl';
import { useStore } from '@stores/context';
import en from '@/messages/en.json';
import ru from '@/messages/ru.json';
import type { ReactNode } from 'react';

const messages = { en, ru };

const I18nProvider = observer(({ children }: { children: ReactNode }) => {
  const { localeStore } = useStore();

  return (
    <NextIntlClientProvider
      locale={localeStore.locale}
      messages={messages[localeStore.locale]}
      timeZone="Europe/Moscow"
    >
      {children}
    </NextIntlClientProvider>
  );
});

export default I18nProvider;
