import React from "react";

const mantFormSkeleton: React.FC = () => {
  return (
    <div className="container flex h-custom flex-col px-5 py-14 rounded-lg mx-auto bg-background-2 body-font animate-pulse space-y-6 items-center">
      <div className="border rounded-lg bg-gray-400 w-1/2 grow"></div>
      <div className="border rounded-lg bg-gray-400 w-1/4 grow"></div>

      <div className="flex space-x-4 w-full grow">
        <div className="border w-full p-2 border-gray-200 rounded-lg btn-form"></div>
        <div className="border w-full p-2 border-gray-200 rounded-lg btn-form"></div>
        <div className="border w-full p-2 border-gray-200 rounded-lg btn-form"></div>
        <div className="border w-full p-2 border-gray-200 rounded-lg btn-form"></div>
        <div className="border w-full p-2 border-gray-200 rounded-lg btn-form"></div>
      </div>

      <div className="border rounded-lg bg-gray-400 w-1/4 grow"></div>
      <div className="border w-1/4 grow p-2 border-gray-200 rounded-lg btn-form"></div>
      <div className="border rounded-lg bg-gray-400 w-1/4 grow"></div>

      <div className=" flex flex-col w-full h-2/5">
        <div className="w-full h-1/4 bg-gray-700 border-b rounded-t-xl"></div>
        <div className="w-full h-3/4 bg-gray-800 rounded-b-xl"></div>
      </div>
    </div>
  );
};

export default mantFormSkeleton;
