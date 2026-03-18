'use client';

import Link from "next/link";
import s from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.content}>
          <div className={s.section}>
            <h3>О нас</h3>
            <Link href="/about-us">О компании</Link>
            <Link href="/">Главная</Link>
          </div>

          <div className={s.section}>
            <h3>Каталог</h3>
            <Link href="/categories">Все категории</Link>
            <Link href="/categories">Мебель (в разработке)</Link>
          </div>

          <div className={s.section}>
            <h3>Помощь</h3>
            <Link href="/">FAQ (в разработке)</Link>
            <Link href="/">Контакты (в разработке)</Link>
          </div>
        </div>

        <div className={s.bottom}>
          <p>&copy; 2026 Lalasia. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
