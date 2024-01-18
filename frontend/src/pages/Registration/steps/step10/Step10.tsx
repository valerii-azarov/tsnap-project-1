import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../redux/store";
import { useNavigate } from "react-router-dom";
import { resetCitiesData, resetOfficesData, resetCategoriesData, resetServicesData, resetServiceTypesData, resetScheduleData, resetData, resetBookingData, resetOtpData } from "../../../../redux/actionCreators";
import { StepProps } from "../../../../interfaces";

import Step from "../step/Step";
import MessageContainer from "../../../../components/MessageContainer/MessageContainer";

const Step10: React.FC<StepProps> = ({ title, subtitle, buttons }) => {
  // Отримуємо доступ до диспетчера Redux
  const dispatch: AppDispatch = useDispatch();
  // Отримуємо дані за допомогою Redux
  const { create } = useSelector((state: RootState) => state.form.booking);
  const { ticketId } = create;

  // Отримуємо функцію для навігації за допомогою React Router
  const navigate = useNavigate();

  // Функція для обробки натискання на кнопку "Завершити"
  const handleCompletedButton = (event: React.FormEvent) => {
    event.preventDefault();
    // Масив функцій для скидання даних
    const resetActions = [
      resetCitiesData,
      resetOfficesData,
      resetCategoriesData,
      resetServicesData,
      resetServiceTypesData,
      resetScheduleData,
      resetData,
      resetBookingData,
      resetOtpData,
    ];
    // Викликаємо кожну функцію скидання даних за допомогою Redux
    resetActions.forEach((resetAction) => dispatch(resetAction()));
    // Навігація до сторінки реєстрації після завершення
    navigate("/queue");
  };

  return (
    <Step
      title={title}
      subtitle={subtitle}
      buttons={buttons}
      handleSubmit={handleCompletedButton}
    >
      {ticketId && (
        <MessageContainer
          type="success"
          importanceText="Вітаємо!"
          message={[
            `Номер вашого електронного талону №${ticketId}.`,
            "Будь ласка, приходьте до ЦНАПу у вказаний час, візьміть з собою всі необхідні документи та покажіть ваш електронний талон. Дякуємо за використання наших послуг!",
            "*Якщо SMS з номером електронного талону не надійшла, ми рекомендуємо вам записати його вручну або зробити скріншот."
          ]}
          style={{ marginTop: "15px" }}
        />
      )}
    </Step>
  );
};

export default Step10;
