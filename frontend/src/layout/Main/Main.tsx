import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import HomePage from "../../pages/Home/HomePage";
import ServicesPage from "../../pages/Services/ServicesPage";
import ServiceDetailsPage from "../../pages/ServiceDetails/ServiceDetailsPage";
import QueuePage from "../../pages/Queue/QueuePage";
import RegistrationPage from "../../pages/Registration/RegistrationPage";
import StatusPage from "../../pages/Status/StatusPage";
import NewsPage from "../../pages/News/NewsPage";
import NewsDetailsPage from "../../pages/NewsDetails/NewsDetailsPage";
import FaqPage from "../../pages/Faq/FaqPage";
import NotFoundPage from "../../pages/NotFound/NotFoundPage";

import "./style.css";

interface MainProps {
  isToggle: boolean;
}

const Main: React.FC<MainProps> = ({ isToggle }) => {
  return (
    <main className={`main__container ${isToggle ? "active" : ""}`}>
      <Header />
      <Routes>
        {/* Головна сторінка */}
        <Route path="/" element={<HomePage />} />
        {/* Сторінки послуг */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/details/:serviceTypeId" element={<ServiceDetailsPage />} />
        {/* Реєстрація та перевірка */}
        <Route path="/queue" element={<QueuePage />} />
        <Route path="/queue/registration" element={<RegistrationPage />} />
        <Route path="/queue/status" element={<StatusPage />} />
        {/* Новини */}
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/details/:newsId" element={<NewsDetailsPage />} />
        {/* Часті запитання */}
        <Route path="/faq" element={<FaqPage />} />
        {/* Сторінка не знайдена */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      {isToggle && <div className="background-overlay" />}
    </main>
  );
};

export default Main;
