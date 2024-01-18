import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/uk";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { loadFeaturedNewsData, loadNewsData } from "../../redux/actionCreators";

import Page from "../../components/Page/Page";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import HeadingBlock from "../../components/HeadingBlock/HeadingBlock";
import Pagination from "../../components/Pagination/Pagination";
import MessageContainer from "../../components/MessageContainer/MessageContainer";

import "./style.css";

const NewsPage: React.FC = () => {
  // Отримуємо доступ до диспетчера Redux
  const dispatch: AppDispatch = useDispatch();
  // Отримуємо дані за допомогою Redux
  const { news } = useSelector((state: RootState) => state.data);
  const { featuredNews, newsList, error } = news;
  const { data: dataNews, totalPages } = newsList;

  // Стан для відстеження поточної сторінки
  const [currentPage, setCurrentPage] = useState<number>(1);
  // Кількість елементів на сторінці
  const itemsPerPage = 10;

  // Функція для зміни сторінки
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Викликаємо ефект для завантаження даних при зміні сторінки
  useEffect(() => {
    dispatch(loadFeaturedNewsData());
    dispatch(loadNewsData(currentPage, itemsPerPage));
  }, [currentPage, dispatch]);
  
  return (
    <Page>
      <Breadcrumbs 
        crumbs={[
          { path: "/", name: "Головна" },
          { name: "Новини" }
        ]}
      />
      <HeadingBlock 
        title="Новини"
        subtitle="Все, що вам потрібно знати: оголошення та новини."
      />
      {dataNews.length > 0 && ( 
        <div className="news__container">
          <div className="news-featured__title">Важливе оголошене</div>
          <div className="news-featured">
            {featuredNews && (
              <div className="news-card featured">
                <div className="news-card__content">
                  {featuredNews.title && <h2>{featuredNews.title}</h2>}
                </div>
                <div className="news-card__footer">
                  {featuredNews.publish_date && (
                    <span>Дата публікації: {moment(featuredNews.publish_date).format("D MMMM YYYY")}</span>
                  )}
                  {featuredNews.id && <Link to={`details/${featuredNews.id}`}>Читати →</Link>}
                </div>
              </div>
            )}
          </div>

          <div className="news-other__title">Інші новини та оновлення</div>
          <div className="news-other__list">
            {dataNews.map((item, index) => (
              <div key={index} className="news-card">
                <div className="news-card__content">
                  {item.title && <h2>{item.title}</h2>}
                </div>
                <div className="news-card__footer">
                  {item.publish_date && (
                    <span>Дата публікації: {moment(item.publish_date).format("D MMMM YYYY")}</span>
                  )}
                  {item.id && <Link to={`details/${item.id}`}>Читати →</Link>}
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
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

export default NewsPage;
