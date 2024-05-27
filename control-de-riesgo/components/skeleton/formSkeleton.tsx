import React from "react";

const formSkeleton: React.FC = () => {
  return (
    <div className="container flex h-custom flex-row px-5 py-14 rounded-lg mx-auto bg-background-2 body-font animate-pulse">
      {/* preguntas sin responder */}
      <div className=" hidden flex-col bg-gray-800 w-96 p-4 space-y-2 lg:flex">
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
        <div className="flex w-60 basis-1/12 border rounded-lg justify-center ">
          <div className="border-e grow"></div>
          <div className="border-e grow bg-white"></div>
          <div className="border-e grow"></div>
          <div className="border-e grow"></div>
          <div className="border-e grow"></div>
          <div className="grow"></div>
        </div>
        {/* preguntas */}
        <div className="flex flex-col basis-11/12 space-y-2 w-full">
          <div className="flex flex-col basis-4/12 rounded-lg bg-background-4 p-4 space-y-2">
            <div className="border basis-3/12 rounded-lg bg-gray-400"></div>
            <div className="border basis-3/12 rounded-lg bg-gray-400 me-40"></div>
            <div className="border basis-6/12 w-40 rounded-lg"></div>
          </div>
          <div className="flex flex-col basis-4/12 rounded-lg bg-background-4 p-4 space-y-2">
            <div className="border basis-3/12 rounded-lg bg-gray-400"></div>
            <div className="border basis-3/12 rounded-lg bg-gray-400 me-40"></div>
            <div className="border basis-6/12 w-40 rounded-lg"></div>
          </div>
          <div className="flex flex-col  basis-4/12 rounded-lg bg-background-4 p-4 space-y-2">
            <div className="border basis-3/12 rounded-lg bg-gray-400"></div>
            <div className="border basis-3/12 rounded-lg bg-gray-400 me-40"></div>
            <div className="border basis-6/12 w-40 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default formSkeleton;
