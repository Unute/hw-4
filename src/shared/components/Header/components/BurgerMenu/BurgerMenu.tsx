'use client'
import { useState } from "react";

import TextHeader from "../TextHeader/TextHeader";

import s from "./BurgerMenu.module.scss";

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
          <TextHeader />
        </div>
      )}
    </>
  );
};

export default BurgerMenu;
