import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../redux/store";
import { setStep, setSelectedOffice, loadCategoriesData } from "../../../../redux/actionCreators";
import { StepProps } from "../../../../interfaces";

import Step from "../step/Step";
import MessageContainer from "../../../../components/MessageContainer/MessageContainer";

const Step2: React.FC<StepProps> = ({ title, subtitle, buttons }) => {
  // Отримуємо доступ до диспетчера Redux
  const dispatch: AppDispatch = useDispatch();
  // Отримуємо дані за допомогою Redux
  const { step: currentStep } = useSelector((state: RootState) => state.form);
  const { offices, categories } = useSelector((state: RootState) => state.data);
  const { officeList, selectedOffice } = offices;
  const { error } = categories;
  
  // Стан для відстеження стану відправки форми
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Визначаємо, чи має бути вимкнено кнопку відправки форми
  const isButtonDisabled = isSubmitted || !selectedOffice.id || !!error;

  // Функція для обробки натискання на кнопку "Назад"
  const handleBackButton = () => {
    dispatch(setStep(currentStep - 1));
  };

  // Функція для обробки подання форми
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  // Функція для обробки зміни обраного офісу
  const handleOfficeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Знаходимо обраний офіс в списку за його ідентифікатором
    const selectedOffice = officeList.find(office => office.id === Number(event.target.value));
    // Якщо офіс знайдено, встановлюємо його як обраний
    if (selectedOffice) {
      dispatch(setSelectedOffice(selectedOffice));
    }
  };

  // Ефект, який виконується при зміні стану відправки форми, поточного кроку або обраного офісу
  useEffect(() => {
    // Якщо форма вже була відправлена, переходимо на наступний крок
    // Якщо обраний офіс не є пустим, завантажуємо дані про категорії
    if (isSubmitted) {
      dispatch(setStep(currentStep + 1));
    } else if (selectedOffice.id !== null) {
      dispatch(loadCategoriesData());
    }
  }, [isSubmitted, currentStep, selectedOffice, dispatch]);

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
        {officeList.map((office) => (
          <label
            className={`form__button ${selectedOffice.id === Number(office.id) ? "active" : ""}`}
            key={Number(office.id)}
          >
            <input
              type="radio"
              name="office"
              value={Number(office.id)}
              checked={Number(office.id) === selectedOffice.id}
              onChange={handleOfficeChange}
            />
            <h4>{office.name}</h4>
            <h5>{office.address}</h5>
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

export default Step2;
