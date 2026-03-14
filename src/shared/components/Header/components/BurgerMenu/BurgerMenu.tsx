'use client'
import { useState } from "react";

import TextHeader from "../TextHeader/TextHeader";
import CartHeader from "../CartHeader/CartHeader";
import s from "./BurgerMenu.module.scss";
import Profile from "../Profile/Profile";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className={`${s.burgerBtn} ${open ? s.open : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Открыть меню"
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div className={s.dropdown}>
          <TextHeader onClose={() => setOpen(false)} />
          <div className={s.actions}>
            <CartHeader showLabel onClose={() => setOpen(false)} />
            <Profile showLabel onClose={() => setOpen(false)} />
            <ThemeToggle showLabel onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default BurgerMenu;
