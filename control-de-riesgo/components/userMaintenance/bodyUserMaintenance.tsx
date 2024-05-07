import React, { useState, useEffect } from "react";
import { User, UserType, DepartmentType } from "../../components/index";
import TableUserMaintenance from "./tableUserMaintenance";
import UserEditor from "./userEditor";

const BodyFormMaintenance: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User>({} as User);
  const [users, setUsers] = useState<User[]>([]);
  const [userTypes, setUserTypes] = useState<UserType[]>([]);
  const [departmentTypes, setDepartmentTypes] = useState<DepartmentType[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error("Error loading the data", error));

    fetch("/api/usertype")
      .then((response) => response.json())
      .then((data) => setUserTypes(data))
      .catch((error) => console.error("Error loading user types:", error));

    fetch("/api/departments")
      .then((response) => response.json())
      .then((data) => setDepartmentTypes(data))
      .catch((error) => console.error("Error loading user types:", error));
  }, []);

  const handleSave = () => {
    fetch("/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Asegúrate de enviar el tipo correcto
      },
      body: JSON.stringify(selectedUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((updatedUser) => {
        // Actualizar el usuario en el array de usuarios
        const updatedUsers = users.map((user) =>
          user.usu_id === updatedUser.usu_id ? updatedUser : user
        );
        setUsers(updatedUsers); // Setear el nuevo array de usuarios
        setSelectedUser({} as User); // Limpiar el usuario seleccionado
      })
      .catch((error) => console.error("Error saving the data", error));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl font-bold text-white mb-4">User Maintenance</h1>
      <div className="bg-gray-800 p-4 flex flex-col justify-center items-center">
        <input
          type="text"
          placeholder="Filter by name..."
          className="input bg-gray-700 text-white outline-none rounded-lg p-3 md:w-1/2"
        />

        {selectedUser && (
          <UserEditor
            user={selectedUser}
            departments={departmentTypes}
            usertypes={userTypes}
            onSave={handleSave}
            onUpdateUser={setSelectedUser}
          />
        )}
      </div>

      <TableUserMaintenance
        users={users}
        onSelectUser={setSelectedUser}
        onDeleteUser={(id) => console.log("Deleting user with ID:", id)}
      />
    </div>
  );
};

export default BodyFormMaintenance;
