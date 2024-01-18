import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

import "./style.css";

const NewsSection: React.FC = () => {
  // Отримуємо дані за допомогою Redux
  const { featuredNews, newsList } = useSelector((state: RootState) => state.data.news);
  const { data: news } = newsList;

  return (
    <React.Fragment>
      {news.length > 0 && (
        <section className="news-section__container">
          <div className="news-section__top">
            <h2>Новини</h2>
            <div className="news-section__button">
              <Link to="/news">Архів новин</Link>
            </div>
          </div>

          <div className="news-section__bottom">
            <div className="news-section__left">
              {featuredNews && (
                <div className="card featured">
                  <div className="card__content">
                    {featuredNews.publish_date && (
                      <h2>
                        {moment(featuredNews.publish_date).format("DD/MM/YYYY")}
                      </h2>
                    )}
                    {featuredNews.title && <h3>{featuredNews.title}</h3>}
                  </div>
                  <div className="card__footer">
                    {featuredNews.id && (
                      <Link to={`/news/details/${featuredNews.id}`}>Читати →</Link>
                    )}
                  </div>
                </div>
              )}
              <div className="news-section__text">
                <p>
                  Ми маємо для вас важливу новину, яка стосується нашої роботи та
                  послуг, що ми надаємо. Будь ласка, уважно ознайомтеся з нашим
                  повідомленням, оскільки інформація може бути корисною та важливою
                  для вас.
                </p>
              </div>
            </div>

            <div className="news-section__right">
              {news && news.slice(0, 4).map((item, index) => (
                <div key={index} className="card">
                  <div className="card__content">
                    {item.publish_date && (
                      <h2>{moment(item.publish_date).format("DD/MM/YYYY")}</h2>
                    )}
                    {item.title && <h3>{item.title}</h3>}
                  </div>
                  <div className="card__footer">
                    {item.id && (
                      <Link to={`/news/details/${item.id}`}>Читати →</Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

export default NewsSection;
