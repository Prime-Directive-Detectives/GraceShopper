import React from "react";

const Pagination = ({
  productsPerPage,
  totalProducts,
  paginate,
  paginateBack,
  paginateFront,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav aria-label="Page navigation">
      <ul className="inline-flex">
        <li>
          <button
            onClick={() => paginateBack()}
            className="h-10 px-5 text-red-400 transition-colors duration-150 rounded-l-lg focus:shadow-outline hover:bg-red-200"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
        </li>
        <li>
          {pageNumbers.map((number) => {
            return (
              <button
                onClick={() => paginate(number)}
                key={number}
                className="h-10 px-5 text-red-400 transition-colors duration-150 focus:shadow-outline hover:bg-red-200"
              >
                {number}
              </button>
            );
          })}
        </li>
        <li>
          <button
            onClick={() => paginateFront()}
            className="h-10 px-5 text-red-400 transition-colors duration-150  rounded-r-lg focus:shadow-outline hover:bg-red-200"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};
export default Pagination;
