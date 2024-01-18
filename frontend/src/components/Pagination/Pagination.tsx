import React, { useState, useEffect } from "react";

import "./style.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // Максимальна кількість видимих сторінок
  const maxVisiblePages = 5;

  // Обробник зміни сторінки
  const handlePageChange = (page: number) => {
    // Переконайтеся, що сторінка знаходиться в допустимих межах
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Стан для збереження масиву номерів сторінок
  const [pages, setPages] = useState<number[]>([]);

  // Ефект, який оновлює масив сторінок при зміні загальної кількості сторінок
  useEffect(() => {
    const tempPages = [];
    for (let i = 1; i <= totalPages; i++) {
      tempPages.push(i);
    }
    setPages(tempPages);
  }, [totalPages]);

  // Функція для відображення номерів сторінок та додавання "..." при необхідності
  const renderPages = () => {
    const pagesToRender = [];

    // Визначення початкової та кінцевої сторінки для відображення
    let startPage = currentPage - Math.floor(maxVisiblePages / 2);
    let endPage = currentPage + Math.floor(maxVisiblePages / 2);

    // Корекція, якщо початкова сторінка менше 1
    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
    }
    // Корекція, якщо кінцева сторінка більше загальної кількості сторінок
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    // Додавання "..." та першої сторінки, якщо початкова сторінка більше 1
    if (startPage > 1) {
      pagesToRender.push(
        <li
          key={1}
          className="pagination__numbers"
          onClick={() => handlePageChange(1)}
        >
          1
        </li>
      );
      if (startPage > 2) {
        pagesToRender.push(
          <li 
            key="dots1" 
            className="pagination__dots"
          >
            ...
          </li>
        );
      }
    }

    // Додавання номерів сторінок в масив
    for (let page = startPage; page <= endPage; page++) {
      pagesToRender.push(
        <li
          key={page}
          className={`pagination__numbers ${page === currentPage ? "active" : ""}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </li>
      );
    }

    // Додавання "..." та останньої сторінки, якщо кінцева сторінка менше загальної кількості сторінок
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pagesToRender.push(
          <li 
            key="dots2" 
            className="pagination__dots"
          >
            ...
          </li>
        );
      }
      pagesToRender.push(
        <li
          key={totalPages}
          className="pagination__numbers"
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </li>
      );
    }

    return pagesToRender;
  };

  return (
    <ul className="pagination">
      {currentPage > 1 && (
        <li
          className="pagination__btn"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <span>←</span>
        </li>
      )}
      {renderPages()}
      {currentPage < totalPages && (
        <li
          className="pagination__btn"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <span>→</span>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
