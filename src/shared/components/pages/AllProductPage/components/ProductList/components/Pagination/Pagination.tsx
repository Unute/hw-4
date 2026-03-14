import React from "react";

import s from "./Pagination.module.scss";
// import ArrowRightIcon from "@/components/UI/icons/ArrowRight";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className={s.pagination}>
      {pages.map((page) => (
        <button
          key={page}
          className={page === currentPage ? s.activePage : s.pageBtn}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
