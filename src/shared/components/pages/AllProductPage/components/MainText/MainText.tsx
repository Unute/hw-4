import s from "./MainText.module.scss";

const MainText = () => {
  return (
    <div className={s.mainText}>
      <div className={s.title}>Product</div>
      <div className={s.description}>
        We display products based on the latest products we have, if you want to
        see our old products please enter the name of the item
      </div>
    </div>
  );
};

export default MainText;
