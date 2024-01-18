import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

import defaultImage from "../../../../assets/images/cites/default.png";
import "./style.css";

const ImageSection: React.FC = () => {
  // Отримуємо дані за допомогою Redux
  const { appearance } = useSelector((state: RootState) => state.settings.interface);
  // Локальний стан для збереження URL зображення
  const [image, setImage] = useState<string>("");

  useEffect(() => {  
    if (appearance.data?.image) {
      // Завантажуємо зображення за URL, якщо воно є в налаштуваннях
      const imageUrl = `${process.env.REACT_APP_API}/api/appearance/images/${appearance.data.image}`;
      const img = new Image();
      // Встановлюємо URL для зображення
      img.src = imageUrl;
      // Відслідковуємо завершення завантаження зображення
      img.onload = () => setImage(imageUrl);
      // Обробка помилок при завантаженні зображення
      img.onerror = () => setImage(defaultImage);
    } else {
      // Якщо URL зображення не вказано в налаштуваннях, встановлюємо стандартне зображення
      setImage(defaultImage);
    }
  }, [appearance.data?.image]);

  return (
    <section className="image-section__container">
      {image && <img src={image} alt={appearance.data?.image || "default.png"} />}
      {image && (
        <div className="image-section__text">
          <h2>{appearance.data?.welcome}</h2>
          <p>Ми надаємо широкий спектр послуг для зручності громадян.</p>
        </div>
      )}
    </section>
  );
};

export default ImageSection;
