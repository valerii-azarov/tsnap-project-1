import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { loadAppearanceData, setSelectedRegion, setToggleModal } from "../../redux/actionCreators";
import { Region } from "../../interfaces";

import Button from "../../components/Button/Button";
import "./style.css";

const RegionModal: React.FC = () => {
  // Отримуємо доступ до диспетчера Redux
  const dispatch: AppDispatch = useDispatch();
  
  // Отримуємо дані за допомогою Redux
  const { regionList, selectedRegion } = useSelector((state: RootState) => state.data.regions);
  const { desktop } = useSelector((state: RootState) => state.settings.interface);
  const { isOpenModal } = desktop;

  // Локальний стан для вибраного регіону
  const [localSelectedRegion, setLocalSelectedRegion] = useState<Region | null>(null);
  // Статуси, які означають недоступність регіону
  const unavailableStatus = ["occupation", "tempinop"];

  // Обробник зміни вибраного регіону
  const handleChange = (selectedRegion: Region) => {
    setLocalSelectedRegion(selectedRegion);
  };

  // Обробник закриття модального вікна
  const handleClose = () => {
    setLocalSelectedRegion(null);
    dispatch(setToggleModal());
  };

  // Обробник збереження вибраного регіону
  const handleSave = () => {
    // Перевіряємо, чи вибраний регіон і його ідентифікатор не є пустими
    if (localSelectedRegion && localSelectedRegion.id !== null) {
      // Диспетчер встановлює вибраний регіон і завантажує відповідні дані вигляду
      dispatch(setSelectedRegion(localSelectedRegion));
      dispatch(loadAppearanceData(localSelectedRegion.id));
    }
    // Закриваємо модальне вікно
    dispatch(setToggleModal());
  };

  return (
    <div className={`region-modal__container ${isOpenModal ? "active" : ""}`}>
      <div className="region-modal__wrapper">
        <div className="region-modal__header">
          <div className="region-modal__title">
            Ваш регіон:{" "}
            <span style={{ textDecoration: "underline" }}>
              {localSelectedRegion?.name || selectedRegion?.name || "не обрано"}
            </span>
          </div>
          <button className="region-modal__close" onClick={handleClose}></button>
        </div>

        <div className="region-modal__content">
          <div className="region-modal__subtitle">
            Обирайте, будь ласка, місто.
          </div>
          <div className="region-modal__city-list">
            {regionList.map((region, index) => (
              <div
                key={index}
                className={`region-modal__status ${region.status}`}
                onClick={() => region.status && !unavailableStatus.includes(region.status) && handleChange(region)}
              >
                {region.name}
              </div>
            ))}
          </div>
        </div>

        <div className="region-modal__footer">
          <Button text="Зберегти" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default RegionModal;
