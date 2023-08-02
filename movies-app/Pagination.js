import React from "react";

export default function Pagination({
  currentPage,
  totalElements,
  onPageClick,
}) {
  const totalPages = Math.ceil(totalElements / 22);
  const startPage = Math.max(1, currentPage - 2);
  console.log("total pages:",totalPages);
  console.log("total elements:",totalElements);


  const numberButtons = [];
  for (let pageNumber = startPage; (pageNumber < startPage + 5) && (pageNumber<= totalPages); pageNumber++) {
    numberButtons.push(
      <button
        className={`${
          pageNumber === currentPage
            ? "bg-purple-600 text-white"
            : "bg-white text-gray-500"
        } border border-black hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
        key={pageNumber}
        onClick={() => onPageClick(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-4">
      <div className="flex justify-center">
        <ul className="inline-flex -space-x-px">
        <button
            className="bg-purple-600 text-white border border-black hover:bg-purple-700 hover:text-white ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => onPageClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {numberButtons}
          <button
            className="bg-purple-600 text-white border border-black hover:bg-purple-700 hover:text-white rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => onPageClick(currentPage + 1)}
            disabled={currentPage === 50}
          >
            Next
          </button>
        </ul>
      </div>
    </div>
  );
}
