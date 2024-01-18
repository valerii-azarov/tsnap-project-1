import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { loadAppearanceData, setSelectedRegion, setToggleSecondMenu } from "../../redux/actionCreators";
import { Region } from "../../interfaces";

import Button from "../../components/Button/Button";
import icon from "../../assets/images/icons/icon.png";
import "./style.css";

const SecondMenu: React.FC = () => {
  // Отримуємо доступ до диспетчера Redux
  const dispatch: AppDispatch = useDispatch();
  
  // Отримуємо дані за допомогою Redux
  const { regionList, selectedRegion }  = useSelector((state: RootState) => state.data.regions);
  const { mobile } = useSelector((state: RootState) => state.settings.interface);
  const { isToggleSecondMenu: isToggleMenu } = mobile;

  // Локальний стан для вибраного регіону
  const [localSelectedRegion, setLocalSelectedRegion] = useState<Region | null>(null);

  // Фільтрація регіонів для відображення тільки "main" і "region" статусів
  const filterRegions = (regions: Region[]) => {
    return regions.filter((region) => region.status === "main" || region.status === "region");
  };

  // Обробник зміни вибраного регіону
  const handleChange = (selectedRegion: Region) => {
    setLocalSelectedRegion(selectedRegion);
  };

  // Обробник закриття меню
  const handleClose = () => {
    setLocalSelectedRegion(null);
    dispatch(setToggleSecondMenu());
  };

  // Обробник збереження вибраного регіону
  const handleSave = () => {
    // Перевіряємо, чи вибраний регіон і його ідентифікатор не є пустими
    if (localSelectedRegion && localSelectedRegion.id !== null) {
      // Диспетчер встановлює вибраний регіон і завантажує відповідні дані вигляду
      dispatch(setSelectedRegion(localSelectedRegion));
      dispatch(loadAppearanceData(localSelectedRegion.id));
    }
    // Закриваємо меню
    dispatch(setToggleSecondMenu());
  };

  return (
    <div className={`second-mobile-menu__container ${isToggleMenu ? "active" : ""}`}>
      <nav className="second-mobile-menu__wrapper">
        <div className="second-mobile-menu__header">
          <div className="second-mobile-menu__region">
            <img src={icon} alt="icon" />
            <span style={{ textDecoration: "underline" }}>
              {localSelectedRegion?.name || selectedRegion?.name || "не обрано"}
            </span>
          </div>
          <div>
            <div className="second-mobile-menu__close" onClick={handleClose}></div>
          </div>
        </div>

        <div className="second-mobile-menu__content">
          <div className="second-mobile-menu__list">
            <ul>
              {filterRegions(regionList).map((region, index) => (
                <li key={index} onClick={() => handleChange(region)}>
                  {region.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="second-mobile-menu__footer">
          <Button text="Зберегти" onClick={handleSave} />
        </div>
      </nav>
    </div>
  );
};

export default SecondMenu;
