import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { checkBookingStatus, resetBookingStatusData } from "../../redux/actionCreators";

import Page from "../../components/Page/Page";
import Button from "../../components/Button/Button";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import HeadingBlock from "../../components/HeadingBlock/HeadingBlock";
import MessageContainer from "../../components/MessageContainer/MessageContainer";

import SingleAppointmentInfo from "./info/SingleAppointmentInfo";
import MultipleAppointmentsInfo from "./info/MultipleAppointmentsInfo";

import "./style.css";

// Інтерфейс для об'єкту, який буде містити помилки валідації
interface ValidationErrors {
  [key: string]: string | boolean;
}

// Інтерфейс для зберігання даних форми
interface Data {
  regCode: string;
  phone: string;
  isHasRegCode: boolean;
  [key: string]: string | boolean;
}

// Стан за замовчуванням для даних форми
const initialState: Data = {
  regCode: "",
  phone: "+380",
  isHasRegCode: false,
};

// Константа для найменувань полів форми
const FIELDS = {
  regCode: "номер електронного талону",
  phone: "номер телефону",
};

// Регулярні вирази для валідації полів форми
const PATTERNS = {
  regCode: /^[0-9]{1,10}$/,
  phone: /\+380\d{9}$/,
};

// Повідомлення про помилки валідації
const ERROR_MESSAGES = {
  required: (field: string) => `${field.charAt(0).toUpperCase() + field.slice(1)} обов'язковий.`,
  regCodeFormat: "Номер електронного талону повинен бути числом.",
  phoneFormat: "Номер телефону має містити 13 символів, зокрема +380 та 9 цифр номера.",
};

const StatusPage: React.FC = () => {
  // Отримуємо доступ до диспетчера Redux
  const dispatch: AppDispatch = useDispatch();

  // Отримуємо дані за допомогою Redux
  const { status } = useSelector((state: RootState) => state.form.booking);
  const { data, statusError } = status;

  // Стан для збереження значень, помилок та для відображення інформації
  const [values, setValues] = useState<Data>({ ...initialState });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isShowInfo, setIsShowInfo] = useState<boolean>(false);
  const [showInfoIndex, setShowInfoIndex] = useState<number | null>(null);

  // Функція для обробки натискання на кнопку "Назад"
  const handleBackButton = () => {
    setIsShowInfo(false);
    dispatch(resetBookingStatusData());
  };

  // Функція для обробки подання форми
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(validate(values));
    // Валідація та відправлення даних, якщо вони валідні
    if (Object.keys(validate(values)).length === 0) {
      const newValues = values.isHasRegCode
        ? { regCode: null, phone: values.phone }
        : { regCode: Number(values.regCode), phone: "" };
      dispatch(checkBookingStatus(newValues));
      setValues({ ...initialState });
    }
  };

  // Функція для відображення/приховування інформації
  const handleShowInfoClick = () => {
    setIsShowInfo((prevShowMore) => !prevShowMore);
  };

  // Функція для відображення/приховування інформації за індексом
  const handleShowInfoByIndexClick = (index: number) => () => {
    setShowInfoIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Функція для обробки зміни значення в полі вводу
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  // Функція для обробки зміни значення чекбокса
  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.checked });
  };

  // Функція для валідації полів форми
  const validate = useCallback((data: Data): ValidationErrors => {
    return Object.keys(data).reduce((acc: ValidationErrors, key) => {
      const value = data[key];
      const isHasRegCode = data.isHasRegCode;
      if (typeof value === "string") {
        // Виклик функції для валідації конкретного поля
        const error = validateField(FIELDS[key as keyof typeof FIELDS], value, PATTERNS[key as keyof typeof PATTERNS], isHasRegCode);
        if (error) {
          acc[key] = error;
        }
      }
      return acc;
    }, {});
  }, []);

  // Функція для валідації конкретного поля форми
  const validateField = (fieldName: string, fieldValue: string, pattern: RegExp, isHasRegCode: boolean) => {
    // Валідація поля "Номер електронного талону"
    if (!isHasRegCode && fieldName === FIELDS.regCode && !pattern.test(fieldValue.trim())) {
      if (!fieldValue.trim()) {
        // Повертаємо повідомлення про обов'язкове поле, якщо воно порожнє
        return ERROR_MESSAGES.required(fieldName);
      }
      // Повертаємо повідомлення про невірний формат номера електронного талону
      return ERROR_MESSAGES.regCodeFormat;
    }
  
    // Валідація поля "Номер телефону"
    if (isHasRegCode && fieldName === FIELDS.phone && (!fieldValue.startsWith("+380") || fieldValue.slice(4).length !== 9)) {
      if (!fieldValue.trim()) {
        // Повертаємо повідомлення про обов'язкове поле, якщо воно порожнє
        return ERROR_MESSAGES.required(fieldName);
      }
      // Повертаємо повідомлення про невірний формат номера телефону
      return ERROR_MESSAGES.phoneFormat;
    }
  };

  return (
    <Page>
      <Breadcrumbs
        crumbs={[
          { path: "/", name: "Головна" },
          { path: "/queue", name: "Електронна черга" },
          { name: "Стан електронної черги" },
        ]}
      />
      <HeadingBlock
        title="Перевірте статус заявки"
        subtitle="Відстежуйте свою заявку та перевіряйте стан електронної черги."
      />

      {data.length > 0 ? (
        data.length === 1 ? (
          <SingleAppointmentInfo 
            data={data}
            isShow={isShowInfo}
            onInfoClick={handleShowInfoClick}
            onBackClick={handleBackButton}
          />
        ) : (
          <MultipleAppointmentsInfo 
            data={data}
            isShow={isShowInfo}
            infoByIndex={showInfoIndex}
            onInfoByIndexClick={handleShowInfoByIndexClick}
            onInfoClick={handleShowInfoClick}
            onBackClick={handleBackButton}
          />
        )
      ) : (
        <React.Fragment>
          <MessageContainer
            type="info"
            importanceText="Важливо!"
            message={["Будь ласка, вводьте дані для перевірки стану заявки. Для швидкості та точності введіть номер електронного талону. При його відсутності встановіть галочку та введіть номер телефону, вказаний при поданні."]}
            style={{ marginBottom: "15px" }}
          />

          <form onSubmit={handleSubmit}>
            <div className="from-status__field">
              <label className="from-status__label">
                Номер електронного талону
              </label>
              <div>
                <input
                  type="text"
                  name="regCode"
                  maxLength={10}
                  value={values.regCode}
                  onChange={handleChange}
                  className={`from-status__input ${errors.regCode ? "invalid" : ""}`}
                  disabled={values.isHasRegCode}
                />
                <label className="from-status__label sm">
                  <input
                    type="checkbox"
                    name="isHasRegCode"
                    checked={values.isHasRegCode}
                    onChange={handleChangeChecked}
                    className="from-status__input"
                  />
                  Не маю номеру електронного талону
                </label>
              </div>
              {errors.regCode && (
                <label className="error">{errors.regCode}</label>
              )}
            </div>

            <div className="from-status__field">
              <label className="from-status__label">Номер телефону</label>
              <input
                type="tel"
                name="phone"
                maxLength={13}
                value={values.phone}
                onChange={handleChange}
                className={`from-status__input ${errors.phone ? "invalid" : ""}`}
                disabled={!values.isHasRegCode}
              />
              {errors.phone && <label className="error">{errors.phone}</label>}
            </div>

            {statusError && (
              <MessageContainer
                type="error"
                message={[statusError]}
                style={{ marginBottom: "15px" }}
              />
            )}
            
            <Button text="Перевірити" type="submit" />
          </form>
        </React.Fragment>
      )}
    </Page>
  );
};

export default StatusPage;
