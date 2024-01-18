import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import "moment/locale/uk";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../redux/store";
import { setStep, setSelectedRecord, checkRecord, loadScheduleData } from "../../../../redux/actionCreators";
import { StepProps } from "../../../../interfaces";

import Step from "../step/Step";
import MessageContainer from "../../../../components/MessageContainer/MessageContainer";

const Step6: React.FC<StepProps> = ({ title, subtitle, buttons }) => {
  // Отримуємо доступ до диспетчера Redux
  const dispatch: AppDispatch = useDispatch();
  // Отримуємо дані за допомогою Redux
  const { step: currentStep, booking } = useSelector((state: RootState) => state.form);
  const { offices, services, schedule } = useSelector((state: RootState) => state.data);
  const { selectedOffice } = offices;
  const { selectedService } = services;
  const { scheduleList, selectedRecord } = schedule;
  const { check } = booking;
  const { checkError } = check;

  // Стани для відстеження стану відправки форми та розгортання деяких елементів
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);
  const [isShowMoreByDate, setIsShowMoreByDate] = useState<{ [date: string]: boolean }>({});

  // Стан для відстеження ширини вікна та визначення, чи є воно мобільним
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width <= 768;

  // Визначаємо, чи має бути вимкнено кнопку відправки форми
  const isButtonDisabled = isSubmitted || !selectedRecord.id || !!checkError;

  // Функції для обробки натискання на кнопку "Назад"
  const handleBackButton = () => {
    dispatch(setStep(currentStep - 1));
  };

  // Функція для обробки подання форми
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  // Функція для розгортання/згортання деяких елементів
  const handleShowMoreClick = () => {
    setIsShowMore((prevShowMore) => !prevShowMore);
  };

  // Функція для розгортання/згортання слотів за конкретну дату на мобільних пристроях
  const handleShowMorByDateClick = (date: string) => {
    setIsShowMoreByDate((prevStates) => ({
      ...prevStates,
      [date]: !prevStates[date],
    }));
  };

  // Функція для обробки обраного записи у розкладі
  const handleRecordChange = (date: string, recordId: number) => {
    // Знаходимо обраний запис за його ідентифікатором у розкладі
    const selectedRecord = scheduleList[date].find((record) => record.id === recordId);
    // Якщо запис знайдено і його ідентифікатор не є пустим, відправляємо дані для перевірки та встановлюємо його як обраний
    if (selectedRecord && selectedRecord.id !== null) {
      dispatch(checkRecord(Number(selectedRecord.id)));
      dispatch(setSelectedRecord({ ...selectedRecord, date }));
    }
  };

  // Функція для відслідковування зміни розміру вікна браузера
  const handleResize = useCallback(() => {
    const newWidth = window.innerWidth;

    // Якщо розмір вікна змінився, оновлюємо стан
    if (newWidth !== width) {
      setWidth(newWidth);
    }
  }, [width]);

  // Ефект, який виконується при зміні стану відправки форми та при монтуванні та розмонтуванні компонента
  useEffect(() => {
    // Додаємо слухача події для відслідковування зміни розміру вікна
    window.addEventListener("resize", handleResize);

    // При розмонтуванні компонента видаляємо слухача події
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  // Ефект, який виконується при зміні стану відправки форми, поточного кроку, обраного офісу, послуги чи записи у розкладі
  useEffect(() => {
    // Якщо форма вже була відправлена, переходимо на наступний крок
    // Якщо обрані офіс, послуга та запис у розкладі не є пустими, завантажуємо розклад для цих даних
    if (isSubmitted) {
      dispatch(setStep(currentStep + 1));
    } else if (selectedOffice.id !== null && selectedService.id !== null && selectedRecord.id !== null) {
      dispatch(loadScheduleData(Number(selectedOffice.id), Number(selectedService.id)));
    }
  }, [isSubmitted, currentStep, selectedOffice, selectedService, selectedRecord, dispatch]);

  return (
    <Step
      title={title}
      subtitle={subtitle}
      buttons={buttons}
      handleSubmit={handleSubmit}
      handleBackButton={handleBackButton}
      isButtonDisabled={isButtonDisabled}
    >
      <div className="form-schedule__container">
        <div className="form-schedule__top">
          {Object.keys(scheduleList).map((date) => (
            <div key={date} className="form-schedule__column">
              <div className="form-schedule__title">
                {moment(date).format("ddd,").charAt(0).toUpperCase() + moment(date).format("ddd,").slice(1)}
                {isMobile ? <>&nbsp;</> : <br/>}
                {moment(date).format("D MMMM")}
              </div>
              <div className="form-schedule__slots">
                {scheduleList[date].slice(0, isMobile ? isShowMore || isShowMoreByDate[date] ? scheduleList[date].length : 4 : isShowMore ? scheduleList[date].length : 5).map((record) => (
                  <button
                    type="button"
                    key={Number(record.id)}
                    className={`form-schedule__slot ${selectedRecord.id === Number(record.id) && record.availability ? "active" : ""}`}
                    data-id={Number(record.id)}
                    onClick={() => handleRecordChange(date, Number(record.id))}
                    disabled={!record.availability}
                  >
                    {moment(record.time, "HH:mm:ss").format("HH:mm")}
                  </button>
                ))}
              </div>
              {isMobile && scheduleList[date].length > 4 && (
                <button
                  type="button"
                  className="form-schedule__show-more"
                  onClick={() => handleShowMorByDateClick(date)}
                >
                  {`Показати ${isShowMoreByDate[date] ? "менше" : "більше"} слотів`}
                  <svg
                    className={`form-schedule__arrow ${isShowMoreByDate[date] ? "up" : "down"}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M8.59978 12.005C8.59978 11.785 8.67979 11.5849 8.83978 11.4249L14.0398 6.42495C14.3598 6.12495 14.8598 6.12494 15.1798 6.44494C15.4798 6.76494 15.4798 7.26496 15.1598 7.58496L10.5598 12.005L15.1598 16.425C15.4798 16.725 15.4798 17.245 15.1798 17.565C14.8798 17.885 14.3598 17.8849 14.0398 17.5849L8.83978 12.585C8.67978 12.425 8.59978 12.225 8.59978 12.005Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
        {!isMobile && (
          <div className="form-schedule__bottom">
            <button
              type="button"
              className="form-schedule__show-more"
              onClick={() => handleShowMoreClick()}
            >
              {`Показати ${isShowMore ? "менше" : "більше"} слотів`}
              <svg
                className={`form-schedule__arrow ${isShowMore ? "up" : "down"}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M8.59978 12.005C8.59978 11.785 8.67979 11.5849 8.83978 11.4249L14.0398 6.42495C14.3598 6.12495 14.8598 6.12494 15.1798 6.44494C15.4798 6.76494 15.4798 7.26496 15.1598 7.58496L10.5598 12.005L15.1598 16.425C15.4798 16.725 15.4798 17.245 15.1798 17.565C14.8798 17.885 14.3598 17.8849 14.0398 17.5849L8.83978 12.585C8.67978 12.425 8.59978 12.225 8.59978 12.005Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        )} 
      </div>
  
      {checkError && (
        <MessageContainer
          type="error"
          message={[checkError]}
          style={{ marginTop: "15px" }}
        />
      )}
    </Step>
  );
};

export default Step6;
