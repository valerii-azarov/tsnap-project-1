import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setToggleMenu } from "../../redux/actionCreators";

import "./style.css";

interface SidebarProps {
  isToggle: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isToggle }) => {
  // Отримуємо доступ до диспетчера Redux
  const dispatch: AppDispatch = useDispatch();

  // Масив елементів меню
  const items = [
    { path: "/", label: "Головна →" },
    { path: "/services", label: "Послуги →" },
    { path: "/queue", label: "Електронна черга →" },
    { path: "/faq", label: "Питання та відповіді →" },
    { path: "/news", label: "Новини →" },
  ];

  // Масив контактної інформації 
  const info = [
    { type: "phone", value: "(044) 200-13-38" },
    { type: "phone", value: "(044) 200-13-39" },
    { type: "phone", value: "(044) 200-13-40" },
    { type: "email", value: "cnap_info@gov.ua" },
  ];

  // Масив іконок соціальних мереж
  const socialIcons = [
    { icon: "facebook.svg", alt: "Facebook" },
    { icon: "telegram.svg", alt: "Telegram" },
    { icon: "instagram.svg", alt: "Instagram" },
    { icon: "twitter.svg", alt: "Twitter" },
  ];

  return (
    <div className={`sidebar__container ${isToggle ? "active" : ""}`}>
      <nav className="sidebar__wrapper">
        <div className="sidebar__header">
          <div
            className="sidebar__close"
            onClick={() => dispatch(setToggleMenu())}
          ></div>
        </div>

        <div className="sidebar__content">
          <ul className="sidebar__list">
            {items.map((item) => (
              <li key={item.path} className="sidebar__item">
                <Link
                  to={item.path}
                  onClick={() => dispatch(setToggleMenu())}
                  className="sidebar__link"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar__footer">
          <div className="sidebar__contact-info">
            <span>Гаряча лінія:</span>
            {info.map((contact, index) => contact.type === "phone" && (
              <a key={index} href={`tel:${contact.value}`}>{contact.value}</a>
            ))}
          </div>

          <div className="sidebar__contact-info">
            <span>Електронна пошта:</span>
            {info.map((contact, index) => contact.type === "email" && (
              <a key={index} href={`mailto:${contact.value}`}>{contact.value}</a>
            ))}
          </div>

          <div className="sidebar__contact-info">
            <span>Следите за нами тут:</span>
            <ul className="sidebar__social-icons">
              {socialIcons.map((item, index) => (
                <li key={index}>
                  <img
                    src={require(`../../assets/images/media/${item.icon}`)}
                    alt={`${item.icon} icon`}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
