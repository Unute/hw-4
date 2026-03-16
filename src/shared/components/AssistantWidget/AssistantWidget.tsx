'use client';

import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useStore } from '@stores/context';
import s from './AssistantWidget.module.scss';

type ActionLink = {
  label: string;
  href: string;
};

type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  action?: ActionLink;
};

type QuickActionId = 'checkout' | 'cart' | 'categories';

const createMessage = (
  role: ChatMessage['role'],
  text: string,
  action?: ActionLink,
): ChatMessage => ({
  id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  role,
  text,
  action,
});

const AssistantWidget = observer(() => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('assistant');
  const { authStore, cartStore, localeStore } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    setMessages([
      createMessage('assistant', t('greeting')),
    ]);
  }, [localeStore.locale, t]);

  const openRoute = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  const getAnswer = (actionId: QuickActionId): { text: string; action: ActionLink } => {
    if (actionId === 'checkout') {
      if (authStore.isAuthenticated) {
        return {
          text: t('answers.checkoutAuth'),
          action: { label: t('actions.openCart'), href: '/cart' },
        };
      }

      return {
        text: t('answers.checkoutGuest'),
        action: { label: t('actions.openRegister'), href: '/register' },
      };
    }

    if (actionId === 'cart') {
      if (cartStore.totalCount > 0) {
        return {
          text: t('answers.cartFilled', {
            count: cartStore.totalCount,
            total: cartStore.totalPrice,
          }),
          action: { label: t('actions.openCart'), href: '/cart' },
        };
      }

      return {
        text: t('answers.cartEmpty'),
        action: { label: t('actions.openCart'), href: '/cart' },
      };
    }

    return {
      text: pathname === '/categories' ? t('answers.categoriesCurrent') : t('answers.categories'),
      action: { label: t('actions.openCategories'), href: '/categories' },
    };
  };

  const handleQuickAction = (actionId: QuickActionId) => {
    const questionMap: Record<QuickActionId, string> = {
      checkout: t('suggestions.checkout'),
      cart: t('suggestions.cart'),
      categories: t('suggestions.categories'),
    };

    const answer = getAnswer(actionId);

    setMessages((prev) => [
      ...prev,
      createMessage('user', questionMap[actionId]),
      createMessage('assistant', answer.text, answer.action),
    ]);
  };

  return (
    <div className={s.root}>
      {isOpen && (
        <section className={s.panel} aria-label={t('title')}>
          <div className={s.header}>
            <div>
              <p className={s.kicker}>{t('badge')}</p>
              <h2 className={s.title}>{t('title')}</h2>
            </div>
            <button
              type="button"
              className={s.close}
              onClick={() => setIsOpen(false)}
              aria-label={t('close')}
            >
              ×
            </button>
          </div>

          <p className={s.subtitle}>{t('subtitle')}</p>

          <div className={s.messages}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={message.role === 'assistant' ? s.assistantMessage : s.userMessage}
              >
                <p>{message.text}</p>
                {message.action && (
                  <button
                    type="button"
                    className={s.actionButton}
                    onClick={() => openRoute(message.action!.href)}
                  >
                    {message.action.label}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className={s.quickActions}>
            <button type="button" className={s.quickAction} onClick={() => handleQuickAction('checkout')}>
              {t('suggestions.checkout')}
            </button>
            <button type="button" className={s.quickAction} onClick={() => handleQuickAction('cart')}>
              {t('suggestions.cart')}
            </button>
            <button type="button" className={s.quickAction} onClick={() => handleQuickAction('categories')}>
              {t('suggestions.categories')}
            </button>
          </div>
        </section>
      )}

      <button
        type="button"
        className={s.trigger}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? t('close') : t('trigger')}
      >
        <span className={s.triggerIcon}>✦</span>
        <span className={s.triggerText}>{t('trigger')}</span>
      </button>
    </div>
  );
});

export default AssistantWidget;