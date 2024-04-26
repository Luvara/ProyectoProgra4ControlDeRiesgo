import React from "react";

const HeaderButton = ({
  onClick,
  children,
  otherClass,
}: {
  onClick: any;
  ariaExpanded?: boolean;
  children: React.ReactNode;
  otherClass?: string;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between w-full px-4 ${otherClass} text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white`}
    >
      {children}
      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 20 20">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 8l5 5 5-5"
        />
      </svg>
    </button>
  );
};

export default HeaderButton;
