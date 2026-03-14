"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import s from "./TextHeader.module.scss";

const navItems = [
  { label: "Product", to: "/" },
  { label: "Categories", to: "/categories" },
  { label: "About us", to: "/about-us" },
];

type TextHeaderProps = {
  onClose?: () => void;
};

const TextHeader = ({ onClose }: TextHeaderProps) => {
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
              onClick={onClose}
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
