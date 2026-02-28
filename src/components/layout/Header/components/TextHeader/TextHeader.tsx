import { useLocation, Link } from "react-router-dom";

import s from "./TextHeader.module.scss";

const navItems = [
  { label: "Product", to: "/" },
  { label: "Categories", to: "/categories" },
  { label: "About us", to: "/about-us" },
];

const TextHeader = () => {
  const { pathname } = useLocation();

  return (
    <nav>
      <ul className={s.navList}>
        {navItems.map((item) =>
          <Link
            key={item.label}
            to={item.to}
            className={`${s.navItem} ${pathname === item.to ? s.active : ""}`}
          >
            {item.label}
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default TextHeader;
