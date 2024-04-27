import React from "react";

const HeaderButtonMobile = ({
  onClick,
  ariaExpanded,
  children,
}: {
  onClick: () => void;
  ariaExpanded?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <button
      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      type="button"
      onClick={onClick}
      aria-expanded={ariaExpanded}
    >
      <span className="sr-only">{children}</span>
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    </button>
  );
};

export default HeaderButtonMobile;
