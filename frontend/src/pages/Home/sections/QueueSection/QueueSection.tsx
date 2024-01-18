import React from "react";

import Button from "../../../../components/Button/Button";
import MessageContainer from "../../../../components/MessageContainer/MessageContainer";
import "./style.css";

const QueueSection: React.FC = () => {
  return (
    <section className="queue-section__container">
      <div className="queue-section__left">
        <div className="queue-section__content">
          <h2>Що таке електронна черга?</h2>
          <p>
            Електронна черга - це зручний та швидкий спосіб отримання послуг в
            ЦНАП. Ви можете зареєструватись в черзі онлайн та очікувати своєї
            черги не виходячи з дому. Коли настав час вашого обслуговування, вам
            прийде повідомлення, що ви можете вийти на прийом. Це дозволяє вам
            ефективно планувати свій час та уникнути зайвих очікувань в черзі.
          </p>
          <Button text="Реєстрація у черзі" link="/queue" />
        </div>
      </div>
      <div className="queue-section__right">
        <MessageContainer
          type="important"
          importanceText="Увага!"
          message={["В разі оголошення повітряної тривоги, ЦНАП можуть бути тимчасово закриті на невизначений період часу з метою забезпечення безпеки."]}
        />
      </div>
    </section>
  );
};

export default QueueSection;
