import React from "react";

const Button = ({
  text,
  onClick,
  color = "blue",
}: {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  color?: string;
}) => {
  const baseClasses =
    "px-4 py-2 rounded shadow text-white font-medium focus:outline-none focus:ring-2 focus:ring-opacity-50";

  const colorClasses =
    color === "blue"
      ? "bg-purple-500 hover:bg-purple-600 focus:ring-purple-300"
      : "bg-green-500 hover:bg-green-600 focus:ring-green-300";

  return (
    <button className={`${baseClasses} ${colorClasses}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
