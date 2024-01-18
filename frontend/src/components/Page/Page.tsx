import React from "react";
import "./style.css";

interface PageProps {
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <div className="page__container">
      <div className="page__wrapper">
        {children}
      </div>
    </div>
  );
};

export default Page;
