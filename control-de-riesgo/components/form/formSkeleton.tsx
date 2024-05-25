import React from 'react';

const formSkeleton: React.FC = () => {
  return (
    <div className="container flex h-custom flex-row px-5 py-14 rounded-lg mx-auto bg-background-2 body-font animate-pulse">
      <div className="flex flex-col bg-gray-800 w-96 p-4 space-y-2">
        <div className="bg-gray-700 h-10 grow rounded-lg "></div>
        <div className="bg-gray-700 h-10 grow rounded-lg "></div>
        <div className="bg-gray-700 h-10 grow rounded-lg "></div>
        <div className="bg-gray-700 h-10 grow rounded-lg "></div>
        <div className="bg-gray-900 h-10 grow rounded-lg "></div>
        <div className="bg-gray-900 h-10 grow rounded-lg "></div>
        <div className="bg-gray-900 h-10 grow rounded-lg "></div>
        <div className="bg-gray-900 h-10 grow rounded-lg "></div>
      </div>

      <div className="flex flex-col bg-background-3 w-full py-2 px-10 items-center justify-center space-y-3">
        {/* paginacion */}
        <div className="flex w-60 min-h-8 border rounded-lg justify-center ">
          <div className="border-e grow"></div>
          <div className="border-e grow bg-white"></div>
          <div className="border-e grow"></div>
          <div className="border-e grow"></div>
          <div className="border-e grow"></div>
          <div className=" grow"></div>
        </div>
        {/* preguntas */}
        <div className="flex flex-col h-full w-full rounded-lg bg-background-4 p-4 space-y-1">
          <div className="border h-full rounded-lg"></div>
          <div className="border min-h-10 w-40 rounded-lg"></div>
        </div>
        <div className="flex flex-col h-full w-full rounded-lg bg-background-4 p-4 space-y-1">
          <div className="border h-full rounded-lg"></div>
          <div className="border min-h-10 w-40 rounded-lg"></div>
        </div>
        <div className="flex flex-col h-full w-full rounded-lg bg-background-4 p-4 space-y-1">
          <div className="border h-full rounded-lg"></div>
          <div className="border min-h-10 w-40 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default formSkeleton;
