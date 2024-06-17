import React, { useState } from "react";
import { User } from "../../index";
import Modal from "../../modal";
import Pagination from "../../form/pagination";

interface TableRequestProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  handleStateChange: (approved: boolean, user: User) => Promise<void>;
}

const TableRequest: React.FC<TableRequestProps> = ({
  users,
  setUsers,
  handleStateChange,
}) => {
  const [confirmUser, setConfirmUser] = useState<User | null>(null);
  const [action, setAction] = useState<"accept" | "reject" | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState("");
  const itemsPerPage = 20;

  const handleApprove = (user: User) => {
    setConfirmUser(user);
    setAction("accept");
  };

  const handleReject = (user: User) => {
    setConfirmUser(user);
    setAction("reject");
  };

  const confirmAction = () => {
    if (confirmUser) {
      if (action === "accept") {
        handleStateChange(true, confirmUser);
      } else if (action === "reject") {
        handleStateChange(false, confirmUser);
      }
      setConfirmUser(null);
      setAction(null);
    }
  };

  const cancelAction = () => {
    setConfirmUser(null);
    setAction(null);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
    setCurrentPage(0); // Reset to first page when filter changes
  };

  const filteredUsers = users.filter(
    (user) => filter === "" || user.usertype?.usut_role === filter
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const displayedUsers = filteredUsers.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const uniqueRoles = Array.from(
    new Set(users.map((user) => user.usertype?.usut_role))
  );

  return (
    <div className="flex flex-col min-w-fit mt-10 bg-register p-10 border items-center">
      <div className="w-1/4 mb-10">
        <div className="inputContainer">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="inputTxt text-center"
          >
            <option className="bg-background-2 text-center" value="">Todos los roles</option>
            {uniqueRoles.map((role) => (
              <option className="bg-background-2" key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table className="w-full text-white text-center">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Apellido</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Rol</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-2 px-4 border-b">
                Sin solicitudes
              </td>
            </tr>
          ) : (
            displayedUsers.map((user) => (
              <tr key={user.usu_id}>
                <td className="py-2 px-4 border-b">{user.usu_name}</td>
                <td className="py-2 px-4 border-b">{`${user.usu_lastname} ${user.usu_slastname}`}</td>
                <td className="py-2 px-4 border-b">{user.usu_email}</td>
                <td className="py-2 px-4 border-b">
                  {user.usertype?.usut_role}
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex space-x-2">
                    <button
                      className="bg-slate-300 text-black px-4 py-2 rounded hover:bg-slate-500"
                      onClick={() => handleReject(user)}
                    >
                      Rechazar
                    </button>
                    <button
                      className="bg-blue-500  text-white px-4 py-2 rounded hover:bg-blue-700"
                      onClick={() => handleApprove(user)}
                    >
                      Aceptar
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="w-full flex flex-col items-center mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {confirmUser && (
        <Modal
          isOpen={!!confirmUser}
          title={`Confirmación de ${
            action === "accept" ? "Aceptación" : "Rechazo"
          }`}
          content={`¿Está seguro de que desea ${
            action === "accept" ? "aceptar" : "rechazar"
          } a ${confirmUser.usu_name} ${confirmUser.usu_lastname}?`}
          onConfirm={confirmAction}
          onCancel={cancelAction}
        />
      )}
    </div>
  );
};

export default TableRequest;
