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
      className="p-2 rounded-xl border-white border-2 img-hover md:hidden"
      type="button"
      onClick={onClick}
      aria-expanded={ariaExpanded}
    >
      <span className="sr-only">{children}</span>
      <svg
        className="w-10 h-10"
        fill="none"
        viewBox="7 0 10 24"
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
