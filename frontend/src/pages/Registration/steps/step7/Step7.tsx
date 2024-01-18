import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../redux/store";
import { setStep, setData } from "../../../../redux/actionCreators";
import { Data, StepProps } from "../../../../interfaces";

import Step from "../step/Step";
import MessageContainer from "../../../../components/MessageContainer/MessageContainer";

// Інтерфейс для об'єкту, який буде містити помилки валідації
interface ValidationErrors {
  [key: string]: string | boolean;
}

// Стан за замовчуванням для даних форми
const initialState: Data = {
  surname: "",
  name: "",
  patronymic: "",
  phone: "+380",
  consent: false,
};

// Константа для найменувань полів форми
const FIELDS = {
  surname: "прізвище",
  name: "ім’я",
  patronymic: "по-батькові",
  phone: "номер телефону",
};

// Регулярні вирази для валідації полів форми
const PATTERNS = {
  surname: "[А-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ-]+",
  name: "[А-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ-]+",
  patronymic: "[А-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ-]+",
  phone: `\\+380\\d{9}$`,
};

// Повідомлення про помилки валідації
const ERROR_MESSAGES = {
  required: (field: string) => `${field.charAt(0).toUpperCase() + field.slice(1)} обов'язковий.`,
  phoneFormat: "Номер телефону має містити 13 символів, зокрема +380 та 9 цифр номера.",
  patternMismatch: (field: string) => `Пишіть, будь ласка, ${field} українською.`,
};

const Step7: React.FC<StepProps> = ({ title, subtitle, buttons }) => {
  // Отримуємо доступ до диспетчера Redux
  const dispatch: AppDispatch = useDispatch();
  // Отримуємо дані за допомогою Redux
  const { step: currentStep } = useSelector((state: RootState) => state.form);
  const { data } = useSelector((state: RootState) => state.form);
  
  // Стан для збереження значень, помилок та вже торкнутих полів
  const [values, setValues] = useState<Data>({ ...initialState, ...data });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<string[]>([]);

  // Стани для відстеження стану відправки форми та помилок при згоді
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [consentError, setConsentError] = useState<boolean>(false);

  // Визначення стану, чи кнопка відправки форми має бути вимкнена
  const isButtonDisabled = isSubmitted;

  // Функція для обробки натискання на кнопку "Назад"
  const handleBackButton = () => {
    dispatch(setStep(currentStep - 1));
  };

  // Функція для обробки подання форми
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Перевірка та оновлення помилок
    setErrors(validate(values));
    setTouched(Object.keys(values));
    setIsSubmitted(true);
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
    // Додавання поля до списку, якщо його ще не було торкнуто
    if (!touched.includes(event.target.name)) {
      setTouched([...touched, event.target.name]);
    }
  };

  // Функція для обробки втрати фокусу поля вводу
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    // Додавання поля до списку, якщо його ще не було торкнуто
    if (!touched.includes(name)) {
      setTouched([...touched, name]);
    }
  };

  // Функція для валідації полів форми
  const validate = useCallback((data: Data): ValidationErrors => {
    return Object.keys(data).reduce((acc: ValidationErrors, key) => {
      const value = data[key];
      if (typeof value === "string") {
        // Виклик функції для валідації конкретного поля
        const error = validateField(FIELDS[key as keyof typeof FIELDS], value, PATTERNS[key as keyof typeof PATTERNS]);
        if (error) {
          acc[key] = error;
        }
      }
      return acc;
    }, {});
  }, []);

  // Функція для валідації конкретного поля форми
  const validateField = (fieldName: string, fieldValue: string, pattern: string) => {
    if (typeof fieldValue === "string" && !fieldValue.trim()) {
      // Повертаємо повідомлення про обов'язкове поле, якщо воно порожнє
      return ERROR_MESSAGES.required(fieldName);
    }
  
    if (fieldName === FIELDS.phone && (!fieldValue.startsWith("+380") || fieldValue.slice(4).length !== 9)) {
      // Повертаємо повідомлення про невірний формат номера телефону
      return ERROR_MESSAGES.phoneFormat;
    }
  
    if (pattern && !new RegExp(pattern).test(fieldValue)) {
      // Повертаємо повідомлення про несупадіння зразку
      return ERROR_MESSAGES.patternMismatch(fieldName);
    }
  };

  // Ефект, який виконується при зміні стану поля після втручання користувача
  useEffect(() => {
    // Виконуємо валідацію для поточних значень та оновлюємо помилки, якщо вони є
    const validationErrors = validate(values);
    const touchedErrors = Object.keys(validationErrors).reduce((acc: ValidationErrors, key) => {
      // Включаємо помилки тільки для тих полів, які були торкнуті користувачем
      if (touched.includes(key)) {
        acc[key] = validationErrors[key];
      }
      return acc;
    }, {});
    // Встановлюємо знайдені помилки для показу користувачеві
    setErrors(touchedErrors);
  }, [touched, values, validate]);
  
  // Ефект, який виконується при зміні стану відправки форми, поточного кроку, значень форми та помилок валідації
  useEffect(() => {
    const hasGivenConsent = values.consent;
    const hasErrors = Object.keys(errors).length !== 0;

    // Перевірка наявності помилок та наявності згоди користувача перед відправкою форми
    if (!hasErrors && isSubmitted) {
      // Якщо згода не надана, встановлюємо помилку згоди та скасовуємо відправку форми
      if (!hasGivenConsent) {
        setConsentError(true);
        setIsSubmitted(false);
      } else {
        // Якщо форма валідна та згода надана, відправляємо дані форми, скасовуємо помилку згоди,
        // скидаємо відстежені поля, скасовуємо відправку та переходимо на наступний крок форми
        dispatch(setData(values));
        setTouched([]);
        setIsSubmitted(false);
        dispatch(setStep(currentStep + 1));
      }
    } else {
      // Якщо є помилки або форма не була відправлена, скасовуємо відправку
      setIsSubmitted(false);
    }
  }, [isSubmitted, currentStep, values, errors, dispatch]);

  return (
    <Step
      title={title}
      subtitle={subtitle}
      buttons={buttons}
      handleSubmit={handleSubmit}
      handleBackButton={handleBackButton}
      isButtonDisabled={isButtonDisabled}
    >  
      <div className="form__field">
        <label className="form__label">Прізвище</label>
        <input
          type="input"
          name="surname"
          minLength={2}
          maxLength={50}
          value={values.surname}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form__input ${errors.surname ? "invalid" : ""}`}
        />
        {errors.surname && <label className="error">{errors.surname}</label>}
      </div>

      <div className="form__field">
        <label className="form__label">Ім'я</label>
        <input
          type="input"
          name="name"
          minLength={2}
          maxLength={50}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form__input ${errors.name ? "invalid" : ""}`}
        />
        {errors.name && <label className="error">{errors.name}</label>}
      </div>

      <div className="form__field">
        <label className="form__label">По-батькові</label>
        <input
          type="input"
          name="patronymic"
          minLength={2}
          maxLength={50}
          value={values.patronymic}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form__input ${errors.patronymic ? "invalid" : ""}`}
        />
        {errors.patronymic && <label className="error">{errors.patronymic}</label>}
      </div>

      <div className="form__field">
        <label className="form__label">Номер телефону</label>
        <input
          type="input"
          name="phone"
          size={13}
          minLength={13}
          maxLength={13}
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form__input ${errors.phone ? "invalid" : ""}`}
        />
        {errors.phone && <label className="error">{errors.phone}</label>}
      </div>

      <div className="form__field">
        <label className="form__label flex">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={handleChangeChecked}
            className="form__input"
          />
          Погоджуюсь на обробку моїх персональних даних
        </label>
      </div>
      
      {consentError && (
        <MessageContainer 
          type="error" 
          message={["Ми не можемо обробити запит без вашої згоди на обробку даних."]}
          style={{ marginTop: "15px" }}
        />
      )}
    </Step>
  );
};

export default Step7;
