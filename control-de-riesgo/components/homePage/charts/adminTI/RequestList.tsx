import React from "react";

interface UserRequest {
  usu_id: number;
  usu_name: string;
  usu_email: string;
  usu_idnumber: string;
  usertype: {
    usut_role: string;
  };
}

const RequestList: React.FC<{
  title: string;
  count: number;
  requests: UserRequest[];
  fetchRequests: () => void;
}> = ({ title, count, requests, fetchRequests }) => (
  <div className="my-4 w-full md:w-2/5 md:flex md:justify-between bg-background-3 shadow-lg rounded-lg p-5 text-white">
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-3">
        {title} (Total: {count})
      </h3>
      {requests.length > 0 ? (
        <ul>
          {requests.map((request) => (
            <li key={request.usu_id} className="mb-2">
              <strong>Name:</strong> {request.usu_name} <br />
              <strong>Email:</strong> {request.usu_email} <br />
              <strong>ID Number:</strong> {request.usu_idnumber} <br />
            </li>
          ))}
        </ul>
      ) : (
        <p>No requests found.</p>
      )}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 rounded-lg text-white"
        onClick={fetchRequests}
      >
        Refresh
      </button>
    </div>
  </div>
);

export default RequestList;
