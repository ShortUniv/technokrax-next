import React from "react";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const setSize = 5;

  // Determine the current set start and end based on currentPage
  let startPage = Math.floor((currentPage - 1) / setSize) * setSize + 1;
  let endPage = Math.min(startPage + setSize - 1, totalPages);

  // Adjust the start and end pages if the current page is second last or last in the current set
  if (currentPage >= endPage - 1 && endPage < totalPages) {
    startPage += 1;
    endPage = Math.min(endPage + 1, totalPages);
  }

  // Adjust the start and end pages if the current page is the first in the current set
  if (currentPage <= startPage && startPage > 1) {
    startPage -= 1;
    endPage = Math.min(startPage + setSize - 1, totalPages);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex mt-4 justify-center ml-auto mr-auto">
      <div className="inline-block shadow-black shadow-md mb-6 pl-2 pr-2 rounded-full">
        <button
          className={`px-4 rounded-full py-4 text-sm font-bold m-2 bg-gray-300`}
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          <GrPrevious />
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`px-4 rounded-full py-2 m-2 ${number === currentPage ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        ))}
        <button
          className={`px-4 rounded-full py-4 text-sm font-bold m-2 bg-gray-300`}
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <GrNext />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
