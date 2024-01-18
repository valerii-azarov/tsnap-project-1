import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import Steps from "./steps/data";
import Page from "../../components/Page/Page";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

import "./style.css";

const RegistrationPage: React.FC = () => {
  // Отримуємо дані за допомогою Redux
  const { step: currentStep } = useSelector((state: RootState) => state.form);
  // Отримуємо компонент для поточного активного кроку
  const ActiveStep = Steps[currentStep].component;

  return (
    <Page>
      <Breadcrumbs
        crumbs={[
          { path: "/", name: "Головна" },
          { path: "/queue", name: "Електронна черга" },
          { name: "Реєстрація в черзi" }
        ]}
      />
      <ActiveStep {...Steps[currentStep]} />
    </Page>
  );
};

export default RegistrationPage;
