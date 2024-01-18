import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { setToggleFirstMenu, setToggleSecondMenu } from "../../redux/actionCreators";

import icon from "../../assets/images/icons/icon.png";
import "./style.css";

interface MenuData {
  path: string;
  label: string;
}

const FirstMenu: React.FC = () => {
  // Отримуємо доступ до диспетчера Redux
  const dispatch: AppDispatch = useDispatch();

  // Отримуємо дані за допомогою Redux
  const { regionList, selectedRegion } = useSelector((state: RootState) => state.data.regions);
  const { mobile } = useSelector((state: RootState) => state.settings.interface);
  const { isToggleFirstMenu: isToggleMenu } = mobile;

  // Масив елементів меню
  const items: MenuData[] = [
    { path: "/", label: "Головна" },
    { path: "/services", label: "Послуги" },
    { path: "/queue", label: "Електронна черга" },
    { path: "/faq", label: "Питання та відповіді" },
    { path: "/news", label: "Новини" },
  ];

  return (
    <div className={`first-mobile-menu__container ${isToggleMenu ? "active" : ""}`}>
      <nav className="first-mobile-menu__wrapper">
        <div className="first-mobile-menu__header">
          <div className="first-mobile-menu__region">
            <img src={icon} alt="icon" />
            <button onClick={() => dispatch(setToggleSecondMenu())} disabled={regionList.length === 0}>
              {selectedRegion.name || "не обрано"}
            </button>            
          </div>
          <div>
            <div className="first-mobile-menu__close" onClick={() => dispatch(setToggleFirstMenu())}></div>
          </div>
        </div>

        <div className="first-mobile-menu__content">
          <ul className="first-mobile-menu__list">
            {items.map((item) => (
              <li key={item.path} className="first-mobile-menu__item">
                <Link to={item.path} onClick={() => dispatch(setToggleFirstMenu())} className="first-mobile-menu__link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default FirstMenu;
