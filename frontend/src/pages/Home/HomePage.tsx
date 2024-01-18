import React from "react";

import Page from "../../components/Page/Page";
import ImageSection from "./sections/ImageSection/ImageSection";
import ServicesSection from "./sections/ServicesSection/ServicesSection";
import QueueSection from "./sections/QueueSection/QueueSection";
import NewsSection from "./sections/NewsSection/NewsSection";
import FaqSection from "./sections/FaqSection/FaqSection";

import "./style.css";

const HomePage: React.FC = () => {
  return (
    <React.Fragment>
      <ImageSection />
      <Page>
        <ServicesSection />
        <QueueSection />
        <NewsSection />
        <FaqSection />
      </Page>
    </React.Fragment>
  );
};

export default HomePage;
