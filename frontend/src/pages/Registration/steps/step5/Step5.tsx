import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../redux/store";
import { setStep, setSelectedServiceType, loadScheduleData } from "../../../../redux/actionCreators";
import { StepProps } from "../../../../interfaces";

import Step from "../step/Step";
import MessageContainer from "../../../../components/MessageContainer/MessageContainer";

const Step5: React.FC<StepProps> = ({ title, subtitle, buttons }) => {
  // Отримуємо доступ до диспетчера Redux
  const dispatch: AppDispatch = useDispatch();
  // Отримуємо дані за допомогою Redux
  const { step: currentStep } = useSelector((state: RootState) => state.form);
  const { offices, services, serviceTypes, schedule } = useSelector((state: RootState) => state.data);
  const { selectedOffice } = offices;
  const { selectedService } = services;
  const { serviceTypeList, selectedServiceType } = serviceTypes;
  const { error } = schedule;
  
  // Стан для відстеження стану відправки форми
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Визначаємо, чи має бути вимкнено кнопку відправки форми
  const isButtonDisabled = isSubmitted || !selectedServiceType.id || !!error;

  // Функція для обробки натискання на кнопку "Назад"
  const handleBackButton = () => {
    dispatch(setStep(currentStep - 1));
  };

  // Функція для обробки подання форми
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  // Функція для обробки зміни обраного типу послуги
  const handleServiceTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Знаходимо обраний тип послуги в списку за його ідентифікатором
    const selectedServiceType = serviceTypeList.find(serviceType => serviceType.id === Number(event.target.value));
    // Якщо тип послуги знайдено, встановлюємо його як обраний
    if (selectedServiceType) {
      dispatch(setSelectedServiceType(selectedServiceType));
    }
  };

  // Ефект, який виконується при зміні стану відправки форми, поточного кроку, обраного офісу, послуги чи типу послуги
  useEffect(() => {
    // Якщо форма вже була відправлена, переходимо на наступний крок
    // Якщо обрані офіс, послуга та тип послуги не є пустими, завантажуємо розклад для цих даних
    if (isSubmitted) {
      dispatch(setStep(currentStep + 1));
    } else if (selectedOffice.id !== null && selectedService.id !== null && selectedServiceType.id !== null) {
      dispatch(loadScheduleData(Number(selectedOffice.id), Number(selectedService.id)));
    }
  }, [isSubmitted, currentStep, selectedOffice, selectedService, selectedServiceType, dispatch]);

  return (
    <Step
      title={title}
      subtitle={subtitle}
      buttons={buttons}
      handleSubmit={handleSubmit}
      handleBackButton={handleBackButton}
      isButtonDisabled={isButtonDisabled}
    >
      <div className="form__list" style={{ "--column-count": "2" } as React.CSSProperties}>
        {serviceTypeList.map((serviceType) => (
          <label
            className={`form__button ${selectedServiceType.id === Number(serviceType.id) ? "active" : ""}`}
            key={Number(serviceType.id)}
          >
            <input
              type="radio"
              name="serviceType"
              value={Number(serviceType.id)}
              checked={Number(serviceType.id) === selectedServiceType.id}
              onChange={handleServiceTypeChange}
            />
            {serviceType.name}
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

export default Step5;
