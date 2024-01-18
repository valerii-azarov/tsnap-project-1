import React from "react";
import { Link } from "react-router-dom";

import Page from "../../components/Page/Page";
import "./style.css";

const NotFoundPage: React.FC = () => {
  return (
    <Page>
      <div className="not-found__description">Сторінку не знайдено</div>
      <div className="not-found__proposition">
        <p>
          Сторінка, яку ви шукаєте, має іншу адресу або видалена. Перейдіть на&nbsp;<Link to="/">головну сторінку</Link>.
        </p>
      </div>
    </Page>
  );
};

export default NotFoundPage;
