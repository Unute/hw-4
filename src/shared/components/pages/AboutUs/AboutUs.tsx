
import s from "./AboutUs.module.scss";

const AboutUs = () => {
  return (
    <div className={s.aboutUsContainer}>
      <h1 className={s.title}>О нас</h1>
      <p className={s.text}>
        Я студент, создавший этот магазин для учебных целей. Здесь вы можете найти лучшие товары, выбрать категории и оформить заказ. Проект демонстрирует современные технологии React, Next.js и MobX.
      </p>
      <div className={s.infoBlock}>
        <h2 className={s.subtitle}>Почему мы?</h2>
        <ul className={s.list}>
          <li>Учебный проект с реальными технологиями</li>
          <li>Удобный интерфейс и быстрый поиск</li>
          <li>Фильтрация по категориям и корзина</li>
          <li>Система авторизации</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;