import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { loadFaqData } from "../../redux/actionCreators";

import Page from "../../components/Page/Page";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import HeadingBlock from "../../components/HeadingBlock/HeadingBlock";
import FaqAccordion from "../../components/FaqAccordion/FaqAccordion";
import MessageContainer from "../../components/MessageContainer/MessageContainer";

import "./style.css";

const FaqPage: React.FC = () => {
  // Отримуємо доступ до диспетчера Redux
  const dispatch: AppDispatch = useDispatch();

  // Отримуємо дані за допомогою Redux
  const { faq } = useSelector((state: RootState) => state.data);
  const { faqList, error } = faq;

  // Ефект для завантаження даних FAQ
  useEffect(() => {
    dispatch(loadFaqData());
  }, [dispatch]);

  return (
    <Page>
      <Breadcrumbs 
        crumbs={[
          { path: "/", name: "Головна" }, 
          { name: "Питання та відповіді" }
        ]}
      />
      <HeadingBlock 
        title="Питання та відповіді"
        subtitle="Отримайте відповіді на найбільш поширені питання."
      />
      {faqList && (
        <div className="news__container">
          <FaqAccordion data={faqList} />
        </div>
      )}

      {error && (
        <MessageContainer 
          type="error" 
          message={[error]} 
          link="/" 
          linkText="← Повернутися до головної сторінки"
        />
      )}
    </Page>
  );
};

export default FaqPage;
