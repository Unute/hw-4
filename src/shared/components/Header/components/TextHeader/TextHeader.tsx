"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import s from "./TextHeader.module.scss";

const navItems = [
  { label: "Product", to: "/" },
  { label: "Categories", to: "/categories" },
  { label: "About us", to: "/about-us" },
];

const TextHeader = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className={s.navList}>
        {navItems.map((item) => {
          const isActive = pathname === item.to;
          return (
            <Link
              key={item.label}
              href={item.to}
              className={`${s.navItem} ${isActive ? s.active : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default TextHeader;
