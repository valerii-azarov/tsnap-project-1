import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { loadCategoriesData, loadServicesData, loadServiceTypesData, setSelectedCategory, setSelectedService, resetServiceTypesData } from "../../redux/actionCreators";

import Page from "../../components/Page/Page";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import HeadingBlock from "../../components/HeadingBlock/HeadingBlock";
import MessageContainer from "../../components/MessageContainer/MessageContainer";

import "./style.css";

const ServicesPage: React.FC = () => {
  // Отримуємо доступ до диспетчера Redux
  const dispatch: AppDispatch = useDispatch();
  // Отримуємо дані за допомогою Redux
  const { categories, services, serviceTypes } = useSelector((state: RootState) => state.data);
  const { categoryList, selectedCategory, error: errorCategory } = categories;
  const { serviceList, selectedService, error: errorService } = services;
  const { serviceTypeList, error: errorServiceType } = serviceTypes;

  // Стан для визначення ширини списків послуг та категорій на мобільних пристроях
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState("33.33%");
  // Перевірка, чи використовується мобільний пристрій
  const isMobile = windowWidth <= 768;

  // Обробник зміни розміру вікна
  const handleResize = useCallback(() => {
    const newWidth = window.innerWidth;

    if (newWidth !== windowWidth) {
      setWindowWidth(newWidth);
    }
  }, [windowWidth]);

  // Викликаємо ефект при зміні розміру вікна
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Встановлюємо ширину відповідно до вибраних категорій та послуг
    if (serviceTypeList.length > 0 && selectedService.id !== null) {
      setWidth("100%");
    } else if (serviceList.length > 0 && selectedCategory.id !== null) {
      setWidth(isMobile ? "100%" : "66.66%");
    } else {
      setWidth(isMobile ? "100%" : "33.33%");
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile, serviceList.length, serviceTypeList.length, selectedCategory.id, selectedService.id, handleResize]);
    
  // Викликаємо ефект для завантаження категорій та послуг
  useEffect(() => {
    dispatch(loadCategoriesData());

    if (selectedCategory.id !== null) {
      dispatch(loadServicesData(selectedCategory.id));
    }

    if (selectedService.id !== null) {
      dispatch(loadServiceTypesData(selectedService.id));
    }
  }, [selectedCategory, selectedService, dispatch]);

  return (
    <Page>
      <Breadcrumbs 
        crumbs={[
         { path: "/", name: "Головна" },
         { name: "Послуги" },
        ]}
      />
      <HeadingBlock 
        title="Послуги" 
        subtitle="Будь ласка, оберіть послугу, яка вас цікавить" 
      />
      {categoryList.length > 0 && (
        <div className="services__container">
          <div className="services__lists" style={{ width }}>
            <div className="categories__list">
              <div className="service__content">
                {categoryList.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => {
                      dispatch(setSelectedCategory(category));
                      dispatch(setSelectedService({ id: null, name: "" }));
                      dispatch(resetServiceTypesData());
                    }}
                    className={`service__item ${selectedCategory.id === category.id ? "selected" : "" }`}
                  >
                    {category.name}                
                  </div>
                ))}
              </div>
            </div>

            {serviceList.length > 0 && (
              <div className={`services__list ${selectedCategory.id !== null ? "open" : ""}`}>
                <div className="service__content">
                {selectedCategory.id !== null ? <h4>{selectedCategory?.name}</h4> : null}
                  {serviceList.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => dispatch(setSelectedService(service))}
                      className={`service__item ${selectedService.id === service.id ? "selected" : ""}`}
                    >
                      {service.name}                
                    </div>
                  ))}
                </div>
              </div>
            )}

            {serviceTypeList.length > 0 && (
              <div className={`service-types__list ${selectedService.id !== null ? "open" : ""}`}>
                <div className="service__content">
                  {selectedService.id !== null ? <h4>{selectedService?.name}</h4> : null}
                  {serviceTypeList.map((serviceType) => (                
                    <div key={serviceType.id} className="service__item">
                      <Link to={`details/${serviceType.id}`}>{serviceType.name}</Link>                
                    </div>
                  ))}
                </div>
            </div>
            )}            
          </div>
        </div>
      )}

      {errorCategory ? (
        <MessageContainer 
          type="error" 
          message={[errorCategory]} 
          link="/" 
          linkText="← Повернутися до головної сторінки" 
        />
      ) : null}

      {selectedCategory.id !== null && errorService ? (
        <MessageContainer 
          type="error" 
          message={[errorService]} 
          style={{ marginTop: "15px" }}
        />
      ) : null}

      {selectedService.id !== null && errorServiceType ? (
        <MessageContainer 
          type="error"
          message={[errorServiceType]} 
          style={{ marginTop: "15px" }}
        />
      ) : null}
    </Page>
  );
};

export default ServicesPage;
