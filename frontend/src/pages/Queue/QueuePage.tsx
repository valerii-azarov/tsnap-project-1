import React from "react";

import Page from "../../components/Page/Page";
import Button from "../../components/Button/Button";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import HeadingBlock from "../../components/HeadingBlock/HeadingBlock";
import MessageContainer from "../../components/MessageContainer/MessageContainer";

import "./style.css";

const QueuePage: React.FC = () => {
  return (
    <Page>
      <Breadcrumbs
        crumbs={[
          { path: "/", name: "Головна" },
          { name: "Електронна черга" }
        ]}
      />
      <HeadingBlock 
        title="Заповніть заявку на потрібну послугу"
        subtitle="Ознайомтесь із процесом та подайте заявку в електронній черзі." 
      />

      <MessageContainer
        type="important"
        importanceText="Важливо!"
        message={["Перед подачею заявки ознайомтесь із наявною інформацією для обробки заявки в ЦНАП. Після цього рекомендуємо вас записатися в електронну чергу для отримання обслуговування. Цей крок не лише допоможе уникнути зайвого очікування, але й забезпечить більш зручний процес отримання потрібної послуги."]}
      />

      <div className="page__actions">
        <Button text="Заповнити заявку на послугу" link="/queue/registration" />
        <Button text="Перевірити статус заявки" link="/queue/status" />
      </div>
    </Page>
  );
};

export default QueuePage;
