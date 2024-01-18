import React from "react";
import moment from "moment";
import { Booking } from "../../../interfaces";
import { appointments } from "./data";

import MessageContainer from "../../../components/MessageContainer/MessageContainer";

interface SingleAppointmentInfoProps {
  data: Booking[];
  isShow: boolean;
  onInfoClick: () => void;
  onBackClick: () => void;
}

const SingleAppointmentInfo: React.FC<SingleAppointmentInfoProps> = ({ data, isShow, onInfoClick, onBackClick }) => {
  return (
    <React.Fragment>
      <MessageContainer
        type={data[0].status}
        importanceText={appointments[data[0].status].status}
        message={appointments[data[0].status].message}
        style={{ marginBottom: "15px" }}
      />

      {data[0].status === "confirmed" && (
        <div>
          <button
            type="button"
            className="form-info__show"
            onClick={onInfoClick}
            style={{ marginBottom: "15px" }}
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

          {isShow && (
            <div className="form-info__container">
              <div className="form-info__content">
                <div className="form-info__alert">Інформація</div>
                <p>
                  <span>Адреса</span>
                  <br />
                  <span>
                    <strong>
                      {data[0].region}, {data[0].city}, {data[0].address}
                    </strong>
                  </span>
                </p>
                <p>
                  <span>Час візиту</span>
                  <br />
                  <span>
                    <strong>
                      {moment(data[0].date, "YYYY-MM-DD").format("D MMMM")},{" "}
                      {moment(data[0].time, "HH:mm:ss").format("HH:mm")}
                    </strong>
                  </span>
                </p>
                <p>
                  <span>Категорія</span>
                  <br />
                  <span>
                    <strong>{data[0].category}</strong>
                  </span>
                </p>
                <p>
                  <span>Послуга</span>
                  <br />
                  <span>
                    <strong>{data[0].service}</strong>
                  </span>
                </p>
                <p>
                  <span>Вид послуги</span>
                  <br />
                  <span>
                    <strong>{data[0].service_type}</strong>
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div>
        <button
          type="button"
          className="from-status__button"
          onClick={onBackClick}
        >
          ← Назад
        </button>
      </div>
    </React.Fragment>
  );
};

export default SingleAppointmentInfo;
