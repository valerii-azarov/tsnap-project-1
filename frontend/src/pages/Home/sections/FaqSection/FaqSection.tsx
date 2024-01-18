import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

import FaqAccordion from "../../../../components/FaqAccordion/FaqAccordion";

import "./style.css";

const FaqSection: React.FC = () => {
  // Отримуємо дані за допомогою Redux
  const { faq } = useSelector((state: RootState) => state.data);
  const { faqList } = faq;

  return (
    <React.Fragment>
      {faqList && faqList.length > 0 && (
        <section className="faq-section__container">
          <div className="faq-section__top">
            <h2>Питання та відповіді</h2>
            <div className="faq-section__button">
              <Link to="/faq">Всі питання</Link>
            </div>
          </div>
          <div className="faq-section__bottom">
            {faqList && <FaqAccordion data={faqList} limit={5} />}
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

export default FaqSection;
