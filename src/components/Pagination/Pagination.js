import React from 'react';
import { Link } from 'gatsby';

export const Pagination = ({ currentPage, totalPages, onPageChange, searchQuery }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (

      <li
        key={number}
        id={number}
        className={` ${
          currentPage === number ? 'active' : null
        }`}
      >
        <Link
          className={` ${
            currentPage === number ? 'bg-primary text-white shadow-lg' : 'shadow-md bg-gray-300 text-black'
          } page-item cursor-pointer h-10 w-10 flex justify-center items-center `}
          to={`/search/${number}?s=${encodeURIComponent(searchQuery)}`}
          onClick={(e) => {
            e.preventDefault();
            onPageChange(number);
          }}
        >
          {number}
        </Link>
      </li>
    );
  });

  return (
    <nav>
      <ul className="pagination flex mt-10 space-x-4 justify-content-center">{renderPageNumbers}</ul>
    </nav>
  );
};

