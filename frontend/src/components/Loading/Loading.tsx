import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import "./style.css";

const Loading: React.FC = () => {
  // Отримуємо стан, який вказує, чи триває процес завантаження даних за допомогою Redux
  const { isLoading } = useSelector((state: RootState) => state.settings);

  return isLoading ? (
    <div className="loading__container">
      <div className="loading"></div>
      <p className="loading__text">Зачекайте, дані завантажуються</p>
    </div>
  ) : null;
};

export default Loading;
