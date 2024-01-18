import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

import "swiper/css";
import "swiper/css/free-mode";
import "./style.css";

const ServicesSection: React.FC = () => {
  // Створюємо посилання на Swiper, щоб керувати каруселлю
  const swiperRef = useRef<SwiperRef>(null);
  // Отримуємо список популярних послуг за допомогою Redux
  const { popularServicesList } = useSelector((state: RootState) => state.data.services);

  // Функція для переміщення до попереднього слайду
  const slidePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  // Функція для переміщення до наступного слайду
  const slideNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  // Налаштування Swiper для каруселі
  const settings = {
    freeMode: true,
    grabCursor: true,
    spaceBetween: 15,
    breakpoints: {
      0: {
        slidesPerView: 2,
      },
      480: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      1024: {
        slidesPerView: 5,
      },
      1280: {
        slidesPerView: 6,
      },
    },
  };

  return (
    <React.Fragment>
      {popularServicesList.length > 0 && (
        <section className="services-section__container">
          <div className="services-section__top">
            <h2>Популярні послуги</h2>
            <div className="services-section__buttons">
              <button onClick={slidePrev}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
                </svg>
              </button>
              <button onClick={slideNext}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="services-section__bottom">
            <Swiper ref={swiperRef} {...settings}>
              {popularServicesList.map((service, index) => (
                <SwiperSlide key={index}>
                  <div className="card">
                    <div className="card__content">
                      <h2>{service.name}</h2>
                    </div>
                    <div className="card__footer">
                      <Link to={`services/details/${service.id}`}>
                        Детальніше →
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

export default ServicesSection;
