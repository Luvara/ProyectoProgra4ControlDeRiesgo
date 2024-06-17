import React, { useEffect, useState } from "react";
import Switch from "react-switch";
import Modal from "../../modal";
import Pagination from "../../form/pagination";
import { User } from "../../index";

interface InformationTableProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  handleStateChange: (
    checked: boolean,
    user: User,
    field: "usu_state" | "usu_torespond"
  ) => void;
}

const InformationTable: React.FC<InformationTableProps> = ({
  users,
  setUsers,
  handleStateChange,
}) => {
  const [confirmUser, setConfirmUser] = useState<User | null>(null);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;

  useEffect(() => {
    console.log("Users in InformationTable:", users); // Verifica los datos recibidos
  }, [users]);

  const handleCheckboxChange = (checked: boolean, user: User) => {
    if (!checked) {
      setConfirmUser(user);
    } else {
      handleStateChange(true, user, "usu_state");
    }
  };

  const confirmDeactivation = () => {
    if (confirmUser) {
      handleStateChange(false, confirmUser, "usu_state");
      setConfirmUser(null);
    }
  };

  const cancelDeactivation = () => {
    setConfirmUser(null);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.usu_name.toLowerCase().includes(filter.toLowerCase()) ||
      user.usu_email.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const displayedUsers = filteredUsers.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-w-fit mt-10 bg-register p-10 border">
      <div className="w-full max-w-3xl">
        <div className="mb-4 inputContainer">
          <input
            type="text"
            placeholder="Filtrar por nombre o correo"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 inputTxt"
          />
          <label className="labelFloat">Filtrar por nombre o correo</label>
        </div>
      </div>

      <table className="w-full text-white mt-10 text-center">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Apellido</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Estado del Empleado de Área</th>
            {displayedUsers.some((user) => user.usu_state === "A") && (
              <th className="py-2 px-4 border-b">Responder Formulario</th>
            )}
          </tr>
        </thead>
        <tbody>
          {displayedUsers.length === 0 ? (
            <tr>
              <td
                colSpan={
                  displayedUsers.some((user) => user.usu_state === "A") ? 5 : 4
                }
                className="py-2 px-4 border-b"
              >
                Sin empleados asignados
              </td>
            </tr>
          ) : (
            displayedUsers.map((user) => (
              <tr key={user.usu_id}>
                <td className="py-2 px-4 border-b">{user.usu_name}</td>
                <td className="py-2 px-4 border-b">{`${user.usu_lastname} ${user.usu_slastname}`}</td>
                <td className="py-2 px-4 border-b">{user.usu_email}</td>
                <td className="py-2 px-4 border-b">
                  <input
                    className="h-6 w-6"
                    type="checkbox"
                    checked={user.usu_state === "A"}
                    onChange={(e) =>
                      handleCheckboxChange(e.target.checked, user)
                    }
                  />
                </td>
                {user.usu_state === "A" && (
                  <td className="py-2 px-4 border-b">
                    <Switch
                      checked={user.usu_torespond === "y"}
                      onChange={(checked) =>
                        handleStateChange(checked, user, "usu_torespond")
                      }
                      offColor="#888"
                      onColor="#0f0"
                      uncheckedIcon={false}
                      checkedIcon={false}
                    />
                  </td>
                )}
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
          title="Confirmación de Desactivación"
          content={`¿Está seguro de que desea desactivar a ${confirmUser.usu_name} ${confirmUser.usu_lastname}?`}
          onConfirm={confirmDeactivation}
          onCancel={cancelDeactivation}
        />
      )}
    </div>
  );
};

export default InformationTable;
