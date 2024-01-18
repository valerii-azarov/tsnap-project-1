import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../redux/store";
import { setStep, setSelectedCategory, loadServicesData } from "../../../../redux/actionCreators";
import { StepProps } from "../../../../interfaces";

import Step from "../step/Step";
import MessageContainer from "../../../../components/MessageContainer/MessageContainer";

const Step3: React.FC<StepProps> = ({ title, subtitle, buttons }) => {
  // Отримуємо доступ до диспетчера Redux
  const dispatch: AppDispatch = useDispatch();
  // Отримуємо дані за допомогою Redux
  const { step: currentStep } = useSelector((state: RootState) => state.form);
  const { categories, services } = useSelector((state: RootState) => state.data);
  const { categoryList, selectedCategory } = categories;
  const { error } = services;
  
  // Стан для відстеження стану відправки форми
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Визначаємо, чи має бути вимкнено кнопку відправки форми
  const isButtonDisabled = isSubmitted || !selectedCategory.id || !!error;

  // Функція для обробки натискання на кнопку "Назад"
  const handleBackButton = () => {
    dispatch(setStep(currentStep - 1));
  };

  // Функція для обробки подання форми
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  // Функція для обробки зміни обраної категорії
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Знаходимо обрану категорію в списку за її ідентифікатором
    const selectedCategory = categoryList.find(category => category.id === Number(event.target.value));
    // Якщо категорію знайдено, встановлюємо її як обрану
    if (selectedCategory) {
      dispatch(setSelectedCategory(selectedCategory));
    }
  };

  // Ефект, який виконується при зміні стану відправки форми, поточного кроку або обраної категорії
  useEffect(() => {
    // Якщо форма вже була відправлена, переходимо на наступний крок
    // Якщо обрана категорія не є пустою, завантажуємо дані про послуги для цієї категорії
    if (isSubmitted) {
      dispatch(setStep(currentStep + 1));
    } else if (selectedCategory.id !== null) {
      dispatch(loadServicesData(Number(selectedCategory.id)));
    }
  }, [isSubmitted, currentStep, selectedCategory, dispatch]);

  return (
    <Step
      title={title}
      subtitle={subtitle}
      buttons={buttons}
      handleSubmit={handleSubmit}
      handleBackButton={handleBackButton}
      isButtonDisabled={isButtonDisabled}
    >
      <div className="form__list" style={{ "--column-count": "3" } as React.CSSProperties}>
        {categoryList.map((category) => (
          <label
            className={`form__button ${selectedCategory.id === Number(category.id) ? "active" : ""}`}
            key={Number(category.id)}
          >
            <input
              type="radio"
              name="category"
              value={Number(category.id)}
              checked={Number(category.id) === selectedCategory.id}
              onChange={handleCategoryChange}
            />
            {category.name}
          </label>
        ))}
      </div>

      {error && (
        <MessageContainer 
          type="error" 
          message={[error]}
          style={{ marginTop: "15px" }}
        />
      )}
    </Step>
  );
};

// Експортуємо компонент Step3
export default Step3;
