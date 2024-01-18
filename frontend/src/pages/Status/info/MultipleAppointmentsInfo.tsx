import React from "react";
import moment from "moment";
import { Booking } from "../../../interfaces";
import { appointments } from "./data";

interface MultipleAppointmentsInfoProps {
  data: Booking[];
  isShow: boolean;
  infoByIndex: number | null;
  onInfoByIndexClick: (index: number) => () => void;
  onInfoClick: () => void;
  onBackClick: () => void;
}

const MultipleAppointmentsInfo: React.FC<MultipleAppointmentsInfoProps> = ({ data, isShow, infoByIndex, onInfoByIndexClick, onInfoClick, onBackClick }) => {
  return (
    <React.Fragment>
      <div className="form-status__title">Ваші електронні талони</div>
      <div className="form-status__list">
        {data.map((item, index) => (
          <div key={index} className="status-card">
            <div className="status-card__content">
              <h4>Електронний талон №{item.id}</h4>
            </div>
            <div className="status-card__footer">
              <span>
                Дата візиту: {moment(item.date, "YYYY-MM-DD").format("D MMMM")}, {moment(item.time, "HH:mm:ss").format("HH:mm")}
              </span>
              <button
                type="button"
                className="form-info__show"
                onClick={onInfoByIndexClick(index)}
                style={{ marginBottom: 0 }}
              >
                Показати
                <svg
                  className={`form-info__arrow ${infoByIndex === index ? "up" : "down"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M8.59978 12.005C8.59978 11.785 8.67979 11.5849 8.83978 11.4249L14.0398 6.42495C14.3598 6.12495 14.8598 6.12494 15.1798 6.44494C15.4798 6.76494 15.4798 7.26496 15.1598 7.58496L10.5598 12.005L15.1598 16.425C15.4798 16.725 15.4798 17.245 15.1798 17.565C14.8798 17.885 14.3598 17.8849 14.0398 17.5849L8.83978 12.585C8.67978 12.425 8.59978 12.225 8.59978 12.005Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>

            {infoByIndex === index && (
              <div className="status-box__container">
                <div className={`status-box__content ${item.status}`}>
                  <div className={`status-box__alert ${item.status}`}>
                    {appointments[item.status].status}
                  </div>
                  {appointments[item.status].message.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                {item.status === "confirmed" && (
                  <div>
                    <div>
                      <button
                        type="button"
                        className="form-info__show"
                        onClick={onInfoClick}
                        style={{ marginBottom: "15px", marginLeft: "15px", marginRight: "15px" }}
                      >
                        Показати інформацію про ваш талон
                        <svg
                          className={`form-info__arrow ${isShow ? "up" : "down"}`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M8.59978 12.005C8.59978 11.785 8.67979 11.5849 8.83978 11.4249L14.0398 6.42495C14.3598 6.12495 14.8598 6.12494 15.1798 6.44494C15.4798 6.76494 15.4798 7.26496 15.1598 7.58496L10.5598 12.005L15.1598 16.425C15.4798 16.725 15.4798 17.245 15.1798 17.565C14.8798 17.885 14.3598 17.8849 14.0398 17.5849L8.83978 12.585C8.67978 12.425 8.59978 12.225 8.59978 12.005Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>

                    {isShow && (
                      <div className="status-box__container">
                        <div className="status-box__content info">
                          <div className="status-box__alert info">
                            Інформація
                          </div>
                          <p>
                            <span>Адреса</span>
                            <br />
                            <span>
                              <strong>
                                {item.region}, {item.city}, {item.address}
                              </strong>
                            </span>
                          </p>
                          <p>
                            <span>Час візиту</span>
                            <br />
                            <span>
                              <strong>
                                {moment(item.date, "YYYY-MM-DD").format("D MMMM")}, {moment(item.time, "HH:mm:ss").format("HH:mm")}
                              </strong>
                            </span>
                          </p>
                          <p>
                            <span>Категорія</span>
                            <br />
                            <span>
                              <strong>{item.category}</strong>
                            </span>
                          </p>
                          <p>
                            <span>Послуга</span>
                            <br />
                            <span>
                              <strong>{item.service}</strong>
                            </span>
                          </p>
                          <p>
                            <span>Вид послуги</span>
                            <br />
                            <span>
                              <strong>{item.service_type}</strong>
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="from-status__button"
        onClick={onBackClick}
      >
        ← Назад
      </button>
    </React.Fragment>
  );
};

export default MultipleAppointmentsInfo;
