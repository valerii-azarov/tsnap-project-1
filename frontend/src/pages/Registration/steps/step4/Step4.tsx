import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../redux/store";
import { setStep, setSelectedService, loadServiceTypesData } from "../../../../redux/actionCreators";
import { StepProps } from "../../../../interfaces";

import Step from "../step/Step";
import MessageContainer from "../../../../components/MessageContainer/MessageContainer";

const Step4: React.FC<StepProps> = ({ title, subtitle, buttons }) => {
  // Отримуємо доступ до диспетчера Redux
  const dispatch: AppDispatch = useDispatch();
  // Отримуємо дані за допомогою Redux
  const { step: currentStep } = useSelector((state: RootState) => state.form);
  const { services, serviceTypes } = useSelector((state: RootState) => state.data);
  const { serviceList, selectedService } = services;
  const { error } = serviceTypes;
  
  // Стан для відстеження стану відправки форми
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Визначаємо, чи має бути вимкнено кнопку відправки форми
  const isButtonDisabled = isSubmitted || !selectedService.id || !!error;

  // Функція для обробки натискання на кнопку "Назад"
  const handleBackButton = () => {
    dispatch(setStep(currentStep - 1));
  };

  // Функція для обробки подання форми
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  // Функція для обробки зміни обраної послуги
  const handleServiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Знаходимо обрану послугу в списку за її ідентифікатором
    const selectedService = serviceList.find(service => service.id === Number(event.target.value));
    // Якщо послугу знайдено, встановлюємо її як обрану
    if (selectedService) {
      dispatch(setSelectedService(selectedService));
    }
  };

  // Ефект, який виконується при зміні стану відправки форми, поточного кроку або обраної послуги
  useEffect(() => {
    // Якщо форма вже була відправлена, переходимо на наступний крок
    // Якщо обрана послуга не є пустою, завантажуємо дані про типи цієї послуги
    if (isSubmitted) {
      dispatch(setStep(currentStep + 1));
    } else if (selectedService.id !== null) {
      dispatch(loadServiceTypesData(Number(selectedService.id)));
    }
  }, [isSubmitted, currentStep, selectedService, dispatch]);

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
        {serviceList.map((service) => (
          <label
            className={`form__button ${selectedService.id === Number(service.id) ? "active" : ""}`}
            key={Number(service.id)}
          >
            <input
              type="radio"
              name="service"
              value={Number(service.id)}
              checked={Number(service.id) === selectedService.id}
              onChange={handleServiceChange}
            />
            {service.name}
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

export default Step4;
