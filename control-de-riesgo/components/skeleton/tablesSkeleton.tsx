import React from "react";
import Pagination from "../form/pagination";

const handlePageChange = (page: number) => {};

const tablesSkeleton = () => {
  return (
    <div className="min-w-fit mt-10 bg-register p-10 border animate-pulse">
      <div className="w-full max-w-3xl ">
        <div className="mb-4 border rounded-lg h-10"></div>
      </div>

      <table className="w-full text-white mt-10 text-center">
        <thead>
          <tr className="flex mb-4">
            <th className="py-2 px-4 w-full ">
              <div className="bg-gray-400 w-full h-6 rounded-lg"></div>
            </th>
            <th className="py-2 px-4 w-full">
              <div className="bg-gray-400 w-full h-6 rounded-lg"></div>
            </th>
            <th className="py-2 px-4 w-full">
              <div className="bg-gray-400 w-full h-6 rounded-lg"></div>
            </th>
            <th className="py-2 px-4 w-full">
              <div className="bg-gray-400 w-full h-6 rounded-lg"></div>
            </th>
            <th className="py-2 px-4 w-full">
              <div className="bg-gray-400 w-full h-6 rounded-lg"></div>
            </th>
            <th className="py-2 px-4 w-full">
              <div className="bg-gray-400 w-full h-6 rounded-lg"></div>
            </th>
          </tr>
        </thead>
        <tbody className="">
          <tr className="">
            <td
              colSpan={6}
              className="flex py-8 px-4 border-y w-full justify-center"
            >
              <div className="bg-gray-400 w-1/3 h-6 rounded-lg"></div>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="w-full flex flex-col items-center mt-8">
        <Pagination
          currentPage={1}
          totalPages={1}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default tablesSkeleton;
