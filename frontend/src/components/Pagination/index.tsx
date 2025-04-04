import React from "react";
import { SalePage } from "types/sales";

type Props = {
  page: SalePage;
  onPageChange: (pageNumber: number) => void;
};

const Pagination = ({ page, onPageChange }: Props) => {
  const pageNumbers = Array.from(Array(page.totalPages).keys());

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${page.number === number ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(number)}
            >
              {number + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;