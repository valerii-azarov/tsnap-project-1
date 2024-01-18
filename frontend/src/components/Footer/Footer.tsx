import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import "./style.css";

const Footer: React.FC = () => {
  // Отримуємо дані за допомогою Redux
  const { popularServicesList } = useSelector((state: RootState) => state.data.services);

  // Оголошуємо розділи для нижнього колонтитула
  let footerSections = [
    {
      title: "Заявникам",
      items: [
        {
          text: "Реєстрація в черзi",
          link: "/queue/registration",
        },
        {
          text: "Стан електронної черги",
          link: "/queue/status",
        },
      ],
    },
    {
      title: "Iнформацiя",
      items: [
        {
          text: "Новини",
          link: "/news",
        },
        {
          text: "Питання та відповіді",
          link: "/faq",
        },
      ],
    },
  ];

  // Якщо є послуги та вони не пусті, додамо розділ "Послуги" до нижнього колонтитула
  if (popularServicesList && popularServicesList.length > 0) {
    // Спочатку створюємо новий масив розділів, де додаємо розділ "Послуги" на другу позицію
    footerSections = [
      ...footerSections.slice(0, 1), // Копіюємо перший розділ
      {
        title: "Послуги",
        items: popularServicesList.slice(0, 4).map((service) => ({
          text: service.name,
          link: `services/details/${service.id}`,
        })),
      },
      ...footerSections.slice(1), // Копіюємо інші розділи, що йшли після першого
    ];
  }

  // Масив іконок соціальних мереж
  const socialIcons = [
    { icon: "facebook.svg", alt: "Facebook" },
    { icon: "telegram.svg", alt: "Telegram" },
    { icon: "instagram.svg", alt: "Instagram" },
    { icon: "twitter.svg", alt: "Twitter" },
  ];

  return (
    <footer className="footer__container">
      <div className="footer__wrapper">
        {footerSections.map((section, index) => (
          <div key={index} className="footer__section">
            <h3>{section.title}</h3>
            <ul className="footer__list">
              {section.items.map((item, index) => (
                <li key={index} className="footer__list-item">
                  <Link to={item.link} className="footer__link">
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer__section">
          <h3>Следите за нами тут:</h3>
          <ul className="footer__social-icons">
            {socialIcons.map((item, index) => (
              <li key={index}>
                <img src={require(`../../assets/images/media/${item.icon}`)} alt={`${item.icon} icon`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="footer__copyright">{new Date().getFullYear()}. Всі права захищені.</p>
    </footer>
  );
};

export default Footer;
