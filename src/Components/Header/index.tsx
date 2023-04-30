import { UserIcon } from "../../image/svg/UserIcon";
import s from "./style.module.scss";

let Header = () => {
  return (
    <div className={s.container}>
      <div className={s.wrap}>
        <div className={s.logo}>
          <p>Каталог</p>
        </div>
        <div className={s.menu}>
          <div className={s.item1}>
            <p>Сравнение</p>
          </div>
          <div className={s.item2}>
            <p>Личный кабинет</p>
            <UserIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
