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
      className={`flex items-center justify-between  ${otherClass}  img-hover`}
    >
      {children}
      <svg
        className="w-2.5 h-2.5 ms-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </button>
  );
};

export default HeaderButton;
