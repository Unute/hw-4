'use client';

import Link from "next/link";
import { observer } from "mobx-react-lite";
import s from "./Header.module.scss";
import BurgerMenu from "./components/BurgerMenu/BurgerMenu";
import TextHeader from "./components/TextHeader/TextHeader";
import CartHeader from "./components/CartHeader";
import Profile from "./components/Profile/Profile";

const Header = observer(() => {

  return (
    <header className={s.header}>
      <Link href="/" className={s.logo}>
        <img src="/svg/logo.svg" alt="Логотип" />
        <img src="/svg/logo_text.svg" alt="Lalasia" />
      </Link>

      <div className={s.desktopNav}>
        <TextHeader />
      </div>

      <div className={s.icon}>
        <CartHeader />
        <Profile />
      </div>

      <div className={s.burgerWrapper}>
        <CartHeader />
        <BurgerMenu />
      </div>
    </header>
  );
});

export default Header;
