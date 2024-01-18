import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../redux/store";
import { setStep, setSelectedCity, loadOfficesData } from "../../../../redux/actionCreators";
import { StepProps } from "../../../../interfaces";

import Step from "../step/Step";
import MessageContainer from "../../../../components/MessageContainer/MessageContainer";

const Step1: React.FC<StepProps> = ({ title, subtitle, buttons }) => {
  // Отримуємо доступ до диспетчера Redux
  const dispatch: AppDispatch = useDispatch();
  // Отримуємо дані за допомогою Redux
  const { step: currentStep } = useSelector((state: RootState) => state.form);
  const { cities, offices } = useSelector((state: RootState) => state.data);
  const { cityList, selectedCity } = cities;
  const { error } = offices;
  
  // Стан для відстеження стану відправки форми
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Визначаємо, чи має бути вимкнено кнопку відправки форми
  const isButtonDisabled = isSubmitted || !selectedCity.id || !!error;

  // Функція для обробки натискання на кнопку "Назад"
  const handleBackButton = () => {
    dispatch(setStep(currentStep - 1));
  };

  // Функція для обробки подання форми
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  // Функція для обробки зміни обраного міста
  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Знаходимо обране місто в списку за його ідентифікатором
    const selectedCity = cityList.find(city => city.id === Number(event.target.value));
    // Якщо місто знайдено, встановлюємо його як обране
    if (selectedCity) {
      dispatch(setSelectedCity(selectedCity));
    }
  };
  
  // Ефект, який виконується при зміні стану відправки форми, поточного кроку або обраного міста
  useEffect(() => {
    // Якщо форма вже була відправлена, переходимо на наступний крок
    // Якщо обране місто не є пустим, завантажуємо дані про офіси для цього міста
    if (isSubmitted) {
      dispatch(setStep(currentStep + 1));
    } else if (selectedCity.id !== null) {
      dispatch(loadOfficesData(Number(selectedCity.id)));
    }
  }, [isSubmitted, currentStep, selectedCity, dispatch]);

  return (
    <Step
      title={title}
      subtitle={subtitle}
      buttons={buttons}
      handleSubmit={handleSubmit}
      handleBackButton={handleBackButton}
      isButtonDisabled={isButtonDisabled}
    >
      <div className="form__list" style={{ "--column-count": "5" } as React.CSSProperties}>
        {cityList.map((city) => (
          <label
            className={`form__button ${selectedCity.id === Number(city.id) ? "active" : ""}`}
            key={Number(city.id)}
          >
            <input
              type="radio"
              name="city"
              value={Number(city.id)}
              checked={Number(city.id) === selectedCity.id}
              onChange={handleCityChange}
            />
            {city.name}
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

export default Step1;
