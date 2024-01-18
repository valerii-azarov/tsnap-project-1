import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../redux/store";
import { setStep, loadCitiesData } from "../../../../redux/actionCreators";
import { StepProps } from "../../../../interfaces";

import Step from "../step/Step";
import MessageContainer from "../../../../components/MessageContainer/MessageContainer";

const Step0: React.FC<StepProps> = ({ title, subtitle, buttons }) => {
  // Отримуємо доступ до диспетчера Redux
  const dispatch: AppDispatch = useDispatch();
  // Отримуємо дані за допомогою Redux
  const { step: currentStep } = useSelector((state: RootState) => state.form);
  const { cities } = useSelector((state: RootState) => state.data);
  const { error } = cities;

  // Стан для відстеження стану відправки форми
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Визначаємо, чи має бути вимкнено кнопку відправки форми
  const isButtonDisabled = isSubmitted || !!error;

  // Функція для обробки подання форми
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  // Ефект, який виконується при зміні стану відправки форми або поточного кроку
  useEffect(() => {
    // Якщо форма вже була відправлена, переходимо на наступний крок
    // В іншому випадку завантажуємо дані про міста
    if (isSubmitted) {
      dispatch(setStep(currentStep + 1));
    } else {
      dispatch(loadCitiesData());
    }
  }, [isSubmitted, currentStep, dispatch]);

  return (
    <Step
      title={title}
      subtitle={subtitle}
      buttons={buttons}
      handleSubmit={handleSubmit}
      isButtonDisabled={isButtonDisabled}
    >
      <MessageContainer
        type="important"
        importanceText="Увага!"
        message={[
          "У разі оголошення повітряної тривоги до початку робочого дня, ЦНАПи починають працювати через 30 хвилин після закінчення повітряної тривоги.",
          "У разі оголошення повітряної тривоги під час робочого дня усі працівники та відвідувачі переходять до найближчого укриття. У цьому разі роботу відновлюють протягом 10 хвилин після відбою повітряної тривоги.",
        ]}
      />

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

// Експортуємо компонент Step0
export default Step0;
