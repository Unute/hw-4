import { makeAutoObservable } from 'mobx';

export type ActionLink = {
  label: string;
  href: string;
};

export type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  action?: ActionLink;
};

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

export class AssistantWidgetStore {
  isOpen = false;
  isMounted = false;
  messages: ChatMessage[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  resetWithGreeting = (text: string) => {
    this.messages = [createMessage('assistant', text)];
  };

  open = () => {
    this.isOpen = true;
  };

  close = () => {
    this.isOpen = false;
  };

  toggle = () => {
    this.isOpen = !this.isOpen;
  };

  mount = () => {
    this.isMounted = true;
  };

  unmount = () => {
    this.isMounted = false;
  };

  addExchange = (question: string, answer: string, action?: ActionLink) => {
    this.messages = [
      ...this.messages,
      createMessage('user', question),
      createMessage('assistant', answer, action),
    ];
  };
}