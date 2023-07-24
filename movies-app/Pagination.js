import React from "react";

export default function Pagination({ currentPage, totalPages, onPageClick }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const showPageNumbers = 5; // Show only 5 page numbers
  const half = Math.floor(showPageNumbers / 2);
  let startPage = currentPage - half;
  let endPage = currentPage + half;

  if (startPage <= 0) {
    startPage = 1;
    endPage = Math.min(showPageNumbers, totalPages);
  } else if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(totalPages - showPageNumbers + 1, 1);
  }

  return (
    <div className="max-w-xl mx-auto">
    <div className="flex justify-center">
      <ul className="inline-flex -space-x-px">
      <button
      className="bg-purple-600 text-white border border-gray-300 hover:bg-purple-700 hover:text-white ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
       
        onClick={() => onPageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {pageNumbers.slice(startPage - 1, endPage).map((pageNumber) => (
        <button
        className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          key={pageNumber}
          onClick={() => onPageClick(pageNumber)}
          disabled={pageNumber === currentPage}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className="bg-purple-600 text-white border border-gray-300 hover:bg-purple-700 hover:text-white rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        onClick={() => onPageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      </ul>
    </div>
    </div>
  );
}
