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
  <div className="flex my-4 w-full bg-background-3 shadow-lg rounded-lg p-5 text-white bg-nodes text-center items-center justify-center">
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-3">
        {title} (Total: {count})
      </h3>
      {requests.length > 0 ? (
        <ul>
          {requests.map((request) => (
            <li key={request.usu_id} className="mb-2">
              <strong>Nombre:</strong> {request.usu_name} <br />
              <strong>Correo:</strong> {request.usu_email} <br />
              <strong>ID:</strong> {request.usu_idnumber} <br />
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron solicitudes.</p>
      )}
      <div className="flex items-center justify-center">
        <button
          className="flex p-2 border rounded-xl text-white w-52 mt-5 font-bold justify-center hover:bg-slate-600"
          onClick={fetchRequests}
        >
          Actualizar
        </button>
      </div>
    </div>
  </div>
);

export default RequestList;
