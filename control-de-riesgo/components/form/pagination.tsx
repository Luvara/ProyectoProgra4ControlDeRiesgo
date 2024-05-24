const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="flex items-center -space-x-px h-8 text-sm">
        <li>
          <button
            className="flex items-center justify-center px-3 h-8 cursor-pointer  text-white bg-transparent border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index}>
            <button
              className={`flex items-center justify-center px-3 h-8 bg-transparent leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                currentPage === index
                  ? "text-black font-bold bg-white"
                  : "text-white bg-transparent"
              }`}
              onClick={() => onPageChange(index)}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            className="flex items-center justify-center px-3 h-8 cursor-pointer text-white bg-transparent border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
