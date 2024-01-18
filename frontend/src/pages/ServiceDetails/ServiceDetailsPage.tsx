import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { loadSelectedServiceData } from "../../redux/actionCreators";
import { ServiceInfo } from "../../interfaces";

import Page from "../../components/Page/Page";
import Button from "../../components/Button/Button";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import HeadingBlock from "../../components/HeadingBlock/HeadingBlock";
import FaqAccordion from "../../components/FaqAccordion/FaqAccordion";
import MessageContainer from "../../components/MessageContainer/MessageContainer";

import "./style.css";

const ServiceDetailsPage: React.FC = () => {
  // Отримуємо параметр serviceTypeId з URL
  const { serviceTypeId } = useParams();
  // Отримуємо доступ до диспетчера Redux
  const dispatch: AppDispatch = useDispatch();
  // Отримуємо дані за допомогою Redux
  const { serviceInfo } = useSelector((state: RootState) => state.data.services);
  const { info, error } = serviceInfo;

  // Створюємо дані для FAQ на основі інформації про послугу
  const createFaqData = (serviceInfo: ServiceInfo) => {
    return [
      {
        id: 1,
        question: "Інформація про послугу",
        answer: serviceInfo.description,
      },
      {
        id: 2,
        question: "Необхідні документи для отримання послуги",
        answer: serviceInfo.required_documents,
      },
      {
        id: 3,
        question: "Нормативні документи",
        answer: serviceInfo.regulatory_documents,
      },
    ];
  };

  // Викликаємо ефект для завантаження інформації про послугу
  useEffect(() => {
    if (serviceTypeId) {
      dispatch(loadSelectedServiceData(serviceTypeId));
    }
  }, [serviceTypeId, dispatch]);

  return (
    <Page>
      <Breadcrumbs 
        crumbs={[
          { path: "/", name: "Головна" },
          { path: "/services", name: "Послуги" },
          { name: "Інформація про послугу" },
        ]}
      />
      <HeadingBlock 
        title="Інформація про послугу"
        subtitle="Ознайомтеся, будь ласка, з усією необхідною інформацією про послугу"
      />
      {info && info.id !== null && (
        <React.Fragment>
          <div className="service-details__container">
            <div className="service-info">
              <div className="service-info__left">
                <div className="service-info__content">
                  <div className="service-info__item">
                    <h4>Ідентифікатор послуги:</h4>
                    <p>{info.id?.toString().padStart(5, "0")}</p>
                  </div>                  
                  <div className="service-info__item">
                    <h4>Назва послуги:</h4>
                    <p>{info.name}</p>
                  </div>
                </div>
              </div>              
              <div className="service-info__right">
                <div className="service-info__content">
                  <div className="service-info__item">
                    <h4>Строки надання:</h4>
                    <p>{info.delivery_time}</p>
                  </div>
                  <div className="service-info__item">
                    <h4>Вартість:</h4>
                    <p>{info.price}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="service-registration">
              <div className="service-registration__content">
                <div className="service-registration__item">
                  <h4>Записатися на отримання послуги</h4>
                  <p>
                    Тут ви можете зареєструватися до електронної черги для
                    отримання послуги у ЦНАПі.
                  </p>
                  <Button text="Реєстрація" link="/" />
                </div>
              </div>
            </div>
          </div>
          
          <FaqAccordion data={createFaqData(info)} />
        </React.Fragment>
      )}

      {error ? (
        <MessageContainer 
          type="error" 
          message={[error]} 
          link="/services" 
          linkText="← Повернутися до послуг"
        />
      ) : null}
    </Page>
  );
};

export default ServiceDetailsPage;
