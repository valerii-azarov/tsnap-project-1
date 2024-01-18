import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import "moment/locale/uk";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { loadSelectedNewsData } from "../../redux/actionCreators";

import Page from "../../components/Page/Page";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import HeadingBlock from "../../components/HeadingBlock/HeadingBlock";
import MessageContainer from "../../components/MessageContainer/MessageContainer";

import "./style.css";

const NewsDetailsPage: React.FC = () => {
  // Отримуємо параметр newsId з URL
  const { newsId } = useParams();
  // Отримуємо доступ до диспетчера Redux
  const dispatch: AppDispatch = useDispatch();

  // Отримуємо дані за допомогою Redux
  const { news } = useSelector((state: RootState) => state.data);
  const { selectedNews, error } = news;

  // Викликаємо ефект для завантаження новини
  useEffect(() => {
    if (newsId) {
      dispatch(loadSelectedNewsData(newsId));
    }
  }, [newsId, dispatch]);

  return (
    <Page>
      <Breadcrumbs 
        crumbs={[
          { path: "/", name: "Головна" },
        { path: "/news", name: "Новини" },
        ]}
      />
      {selectedNews && selectedNews.id !== null && (
        <div className="news-details__container">
          <HeadingBlock 
            title={selectedNews.title}
            subtitle={`Дата публікації: ${moment(selectedNews?.publish_date).format("D MMMM YYYY")}`}
          />
          <div>
            {selectedNews.content && selectedNews.content.split('\n').map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex}>{paragraph}</p>
            ))}
          </div>      
          <div className="news-details__link">
            <Link to="/news">← Повернутися</Link>
          </div>
        </div>
      )}

      {error ? (
        <MessageContainer 
          type="error" 
          message={[error]} 
          link="/news" 
          linkText="← Повернутися до новин"
        />
      ) : null}
    </Page>
  );
};

export default NewsDetailsPage;
