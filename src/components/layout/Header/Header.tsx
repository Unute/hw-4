import { Link } from 'react-router-dom';
import TextHeader from './components/TextHeader/TextHeader';
import s from './Header.module.scss';

const Header = () => {
  return (
    <header className={s.header}>
      <Link to="/" className={s.logo}>
        <img src="/svg/logo.svg" alt="Логотип" />
        <img src="/svg/logo_text.svg" alt="Lalasia" />
      </Link>

      <TextHeader />
      
      <div className={s.icon}>
        <img src="/svg/bag.svg" alt="Корзина" />
        <img src="/svg/user.svg" alt="профиль" />
      </div>
    </header>
  );
};

export default Header;