import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { setToggleMenu, setToggleFirstMenu, setToggleModal } from "../../redux/actionCreators";

import logo from "../../assets/images/icons/logo.png";
import icon from "../../assets/images/icons/icon.png";
import "./style.css";

const Header: React.FC = () => {
  // Отримуємо доступ до диспетчера Redux
  const dispatch: AppDispatch = useDispatch();

  // Отримуємо дані за допомогою Redux
  const { regionList, selectedRegion } = useSelector((state: RootState) => state.data.regions);
  const { appearance } = useSelector((state: RootState) => state.settings.interface);
  
  // Стан для визначення ширини вікна браузера
  const [width, setWidth] = useState<number>(window.innerWidth);
  // Визначаємо, чи сторінка відображається на мобільному пристрої
  const isMobile = width <= 768;

  // Обробник зміни розміру вікна браузера з використанням useCallback
  const handleResize = useCallback(() => {
    const newWidth = window.innerWidth;

    if (newWidth !== width) {
      setWidth(newWidth);
    }
  }, [width]);

  // Встановлюємо обробники для події зміни розміру вікна браузера
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Забираємо обробники при виході з компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <header className="header__container">
      <div className="header__wrapper">
        <div className="header__logo">
          <img src={logo} alt="logo" />
          {appearance && (
            <div className="header__text-logo">
              <h2>{appearance.data.text}</h2>
              <h4>центр надання адміністративних послуг</h4>
            </div>
          )}
        </div>

        <div className="header__region">
          <img src={icon} alt="icon" />
          <span>Ваш регион:</span>
          <button onClick={() => dispatch(setToggleModal())} disabled={regionList.length === 0}>
            {selectedRegion.name ? `м.${selectedRegion.name}` : "не обрано"}
          </button>          
        </div>

        <div className="header__toggle" onClick={() => dispatch(isMobile ? setToggleFirstMenu() : setToggleMenu())}>
          <div className="header__toggle-icon"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
