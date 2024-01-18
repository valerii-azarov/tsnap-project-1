import React, { useState, useEffect } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../redux/store";
import { setStep, sendOtp } from "../../../../redux/actionCreators";
import { StepProps } from "../../../../interfaces";

import Step from "../step/Step";

const Step8: React.FC<StepProps> = ({ title, subtitle, buttons }) => {
  // Отримуємо доступ до диспетчера Redux
  const dispatch: AppDispatch = useDispatch();
  // Отримуємо дані за допомогою Redux
  const { step: currentStep, data } = useSelector((state: RootState) => state.form);
  const { cities, offices, categories, services, serviceTypes, schedule } = useSelector((state: RootState) => state.data);
  // Деструктуризація об'єктів
  const { selectedCity } = cities;
  const { selectedOffice } = offices;
  const { selectedCategory } = categories;
  const { selectedService } = services;
  const { selectedServiceType } = serviceTypes;
  const { selectedRecord } = schedule;
  // Деструктуризація даних користувача з форми
  const { surname, name, patronymic, phone } = data;

  // Стан для відстеження стану відправки форми
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Функція для обробки натискання на кнопку "Назад"
  const handleBackButton = () => {
    dispatch(setStep(currentStep - 1));
  };

  // Функція для обробки подання форми
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  // Ефект, який виконується при зміні стану відправки форми, поточного кроку та номеру телефону
  useEffect(() => {
    // Якщо форма вже була відправлена, переходимо на наступний крок форми
    if (isSubmitted) {
      dispatch(setStep(currentStep + 1));
      // Відправка OTP-коду на вказаний номер телефону
      dispatch(sendOtp(phone));
    }
  }, [isSubmitted, currentStep, phone, dispatch]);

  return (
    <Step
      title={title}
      subtitle={subtitle}
      buttons={buttons}
      handleSubmit={handleSubmit}
      handleBackButton={handleBackButton}
    >
      <div className="form__field">
        <label className="form__label">
          Місто
        </label>
        <label className="form__label">
          <b>{selectedCity?.name || "не вказано"}</b>
        </label>
      </div>

      <div className="form__field">
        <label className="form__label">
          Адреса
        </label>
        <label className="form__label">
          <b>{`${selectedOffice?.name} (${selectedOffice?.address})`}</b>
        </label>
      </div>

      <div className="form__field">
        <label className="form__label">
          Категорія
        </label>
        <label className="form__label">
          <b>{selectedCategory?.name}</b>
        </label>
      </div>

      <div className="form__field">
        <label className="form__label">
          Послуга
        </label>
        <label className="form__label">
          <b>{selectedService?.name}</b>
        </label>
      </div>

      <div className="form__field">
        <label className="form__label">
          Вид послуги
        </label>
        <label className="form__label">
          <b>{selectedServiceType?.name}</b>
        </label>
      </div>

      <div className="form__field">
        <label className="form__label">
          Час візиту
        </label>
        <label className="form__label">
          <b>{`${moment(selectedRecord?.date, "YYYY-MM-DD").format("D MMMM")}, ${moment(selectedRecord?.time, "HH:mm:ss").format("HH:mm")}`}</b>
        </label>
      </div>

      <div className="form__field">
        <label className="form__label">
          ПІБ
        </label>
        <label className="form__label">
          <b>{`${surname} ${name} ${patronymic}`}</b>
        </label>
      </div>

      <div className="form__field">
        <label className="form__label">
          Телефон
        </label>
        <label className="form__label">
          <b>{phone}</b>
        </label>
      </div>
    </Step>
  );
};

export default Step8;
