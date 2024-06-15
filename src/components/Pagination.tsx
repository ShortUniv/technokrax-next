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
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex mt-4 justify-center ml-auto mr-auto">
      <div className="inline-block shadow-black shadow-md mb-6 pl-2 pr-2 rounded-full">
        <button
          className={`px-4 rounded-full py-4 text-sm font-bold m-2  bg-gray-300`}
          onClick={() => onPageChange(currentPage - 1)}
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
          className={`px-4 rounded-full py-4 text-sm font-bold m-2  bg-gray-300`}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <GrNext />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
