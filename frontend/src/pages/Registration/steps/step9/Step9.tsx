import React, { useState, useEffect, useRef, useMemo } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../redux/store";
import { setStep, sendOtp, verifyOtp, createBooking } from "../../../../redux/actionCreators";
import { StepProps } from "../../../../interfaces";

import Step from "../step/Step";
import Button from "../../../../components/Button/Button";
import MessageContainer from "../../../../components/MessageContainer/MessageContainer";

const Step9: React.FC<StepProps> = ({ title, subtitle, buttons }) => {
  // Створюємо референцію для отримання доступу до інпутів OTP-коду
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Отримуємо доступ до диспетчера Redux
  const dispatch: AppDispatch = useDispatch();
  // Отримуємо дані за допомогою Redux
  const { step: currentStep, booking, otp, data } = useSelector((state: RootState) => state.form);
  const { categories, services, serviceTypes, schedule } = useSelector((state: RootState) => state.data);
  // Деструктуризація об'єктів
  const { selectedCategory } = categories;
  const { selectedService } = services;
  const { selectedServiceType } = serviceTypes;
  const { selectedRecord } = schedule;

  // Створення об'єкту з даними форми та додатковими даними
  const formData = useMemo(() => {
    const otherData = { categoryId: selectedCategory.id, serviceId: selectedService.id, serviceTypeId: selectedServiceType.id, scheduleId: selectedRecord.id };

    return {
      ...data,
      ...otherData,
    };
  }, [data, selectedCategory.id, selectedService.id, selectedServiceType.id, selectedRecord.id]);

  // Отримуємо дані OTP та бронювання
  const { send, verify } = otp;
  const { create } = booking;
  // Деструктуризація даних OTP та бронювання
  const { sendError } = send;
  const { isValid, verifyError } = verify;
  const { isBookingCreated, createError } = create;

  // Зазначаємо константи для довжини OTP-коду та інтервалу для відправки повторно
  const OTP_LENGTH = 6;
  const COOLDOWN_SECONDS = 30;

  // Стани для відстеження OTP-коду та залишкового часу для відправки повторно
  const [localOtp, setLocalOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [remaining, setRemaining] = useState(COOLDOWN_SECONDS);
  const [isResending, setIsResending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Визначаємо, чи має бути вимкнено кнопку відправки форми
  const isButtonDisabled = isSubmitted || !isBookingCreated || !isValid;

  // Функція для обробки натискання на кнопку "Назад"
  const handleBackButton = () => {
    dispatch(setStep(currentStep - 1));
  };

  // Функція для обробки подання форми
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  // Функція для обробки натискання на кнопку "Перевірити код"
  const handleClickCheckingCode = () => {
    dispatch(verifyOtp(localOtp.join("")));
  };

  // Функція для обробки натискання на кнопку "Відправити повторно" (Не проходить SMS з кодом?)
  const handleClickResending = () => {
    setIsResending(true);
    dispatch(sendOtp(formData.phone));
  };

  // Функція для обробки зміни значення інпуту OTP-коду
  const handleInputChangeWrapper = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    // Регулярний вираз для перевірки, чи введене значення є числом
    const regex = /^[0-9\b]+$/;
    // Перевіряємо, чи введене значення є числом за допомогою регулярного виразу
    if (regex.test(event.target.value)) {
      // Клонуємо поточний масив значень OTP
      const newOtp = [...localOtp];
      // Записуємо нове значення відповідного індексу в масив
      newOtp[index] = event.target.value;
      // Оновлюємо стан з новим масивом значень
      setLocalOtp(newOtp);
      // Перевіряємо, чи введене значення не порожнє і чи не досягли кінця масиву, щоб фокусувати наступний елемент
      if (event.target.value !== "" && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1].focus();
      } else if (event.target.value === "" && index > 0) {
        // Якщо введене значення порожнє, але не на початку масиву, фокусуємо попередній елемент
        inputRefs.current[index - 1].focus();
      }
    } else {
      // Якщо введене значення не є числом, очищаємо його
      event.target.value = "";
    }
  };

  // Функція для обробки натискання клавіші на інпуті OTP-коду
  const handleInputKeyDownWrapper = (index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Якщо натискана клавіша - Backspace
    if (event.key === "Backspace") {
      // Перевіряємо, чи не на початку масиву і чи поточний елемент порожній
      if (index > 0 && localOtp[index] === "") {
        // Фокусуємо попередній елемент
        inputRefs.current[index - 1].focus();
      }
      // Клонуємо поточний масив значень OTP
      const newOtp = [...localOtp];
      // Очищаємо значення поточного елементу
      newOtp[index] = "";
      // Оновлюємо стан з новим масивом значень
      setLocalOtp(newOtp);
    }
    // Якщо натискана клавіша - ArrowLeft (стрілка вліво) і не на початку масиву
    else if (event.key === "ArrowLeft" && index > 0) {
      // Фокусуємо попередній елемент
      inputRefs.current[index - 1].focus();
    }
    // Якщо натискана клавіша - ArrowRight (стрілка вправо) і не на кінці масиву
    else if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      // Фокусуємо наступний елемент
      inputRefs.current[index + 1].focus();
    }
  };

  // Ефект для відстеження залишкового часу для відправки повторно
  useEffect(() => {
    // Локальна змінна для таймеру
    let timer: NodeJS.Timeout;
    // Якщо відбувається повторна відправка
    if (isResending) {
      // Запускаємо інтервал, який кожну секунду зменшує значення часу
      timer = setInterval(() => {
        setRemaining((prev) => prev - 1);
      }, 1000);
    }
    // Функція очистки таймеру при зміні стану
    return () => clearInterval(timer);
  }, [isResending]);

  // Ефект для обнулення залишкового часу та вимкнення статусу відправки повторно
  useEffect(() => {
    if (Number(remaining) === 0) {
      setIsResending(false);
      setRemaining(COOLDOWN_SECONDS);
    }
  }, [remaining]);

  // Ефект для створення бронювання при валідності OTP-коду
  useEffect(() => {
    if (isValid) {
      dispatch(createBooking(formData));
    }
  }, [isValid, formData, dispatch]);

  // Ефект, який виконується при зміні стану відправки форми та поточного кроку
  useEffect(() => {
    // Якщо форма вже була відправлена, переходимо на наступний крок форми
    if (isSubmitted) {
      dispatch(setStep(currentStep + 1));
    }
  }, [isSubmitted, currentStep, dispatch]);

  return (
    <Step
      title={title}
      subtitle={subtitle}
      buttons={buttons}
      handleSubmit={handleSubmit}
      handleBackButton={handleBackButton}
      isButtonDisabled={isButtonDisabled}
    >
      <div className="form-otp__container">
        <div className="form-otp__section">
          <div className="form-otp__message">
            <p>
              Ми надіслали SMS з кодом на ваш телефон&nbsp;
              <b>{data.phone}</b>
            </p>
          </div>
        </div>

        <div className="form-otp__section">
          <div className="form-otp__input-group">
            {Array.from({ length: OTP_LENGTH }, (_, index) => (
              <input
                key={index}
                type="input"
                className={`form-otp__input-field ${verifyError ? "invalid" : ""}`}
                maxLength={1}
                value={localOtp[index]}
                onChange={handleInputChangeWrapper(index)}
                onKeyDown={handleInputKeyDownWrapper(index)}
                ref={(event) => event && (inputRefs.current[index] = event)}
                disabled={isBookingCreated}
              />
            ))}
          </div>          
        </div>

        <div className="form-otp__section">
          <Button             
            text="Перевірити код"
            onClick={handleClickCheckingCode}
            disabled={isBookingCreated}
            type="button"
          />
        </div>

        <div className="form-otp__section">
          <div className="form-otp__issue-message">
            {isResending ? (
              <p>
                Зачекайте&nbsp;<b>{moment.utc(remaining * 1000).format("mm:ss")}</b>
                &nbsp;перед повторним надсиланням коду.
              </p>
            ) : (
              !isBookingCreated && (
                <button
                  type="button"
                  onClick={handleClickResending}
                  className="form-otp__resend"
                >
                  Не проходить SMS з кодом?
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {sendError && (
        <MessageContainer
          type="error"
          message={[sendError]}
          style={{ marginTop: "15px" }}
        />
      )}

      {verifyError && (
        <MessageContainer
          type="error"
          message={[verifyError]}
          style={{ marginTop: "15px" }}
        />
      )}

      {createError && (
        <MessageContainer
          type="error"
          message={[createError]}
          style={{ marginTop: "15px" }}
        />
      )}
    </Step>
  );
};

export default Step9;
