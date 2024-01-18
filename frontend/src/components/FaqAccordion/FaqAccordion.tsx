import React, { useState } from "react";
import { Faq } from "../../interfaces";

import "./style.css";

interface FaqAccordionProps {
  data: Faq[];
  limit?: number;
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ data, limit }) => {
  // Використовуємо стан для відстеження відкритого питання
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Функція для зміни стану відкритого питання
  const toggleAnswer = (index: number) => { 
    setOpenIndex(openIndex === index ? null : index);
  };

  // Обмежуємо список питань за допомогою параметра limit або відображає всі питання
  const limitedData = limit ? data.slice(0, limit) : data;

  return (
    <div className="faq__container">
      {limitedData && limitedData.map((item, index) => (
        <div className={`faq__accordion ${index === openIndex ? "active" : ""}`} key={index}>
          <div className="faq__question" onClick={() => toggleAnswer(index)}>
            {item.question}
          </div>
          <div className="faq__answer">
            <div className="faq__content">
              {item.answer.split('\n').map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex}>{paragraph}</p>
              ))}
             </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;
