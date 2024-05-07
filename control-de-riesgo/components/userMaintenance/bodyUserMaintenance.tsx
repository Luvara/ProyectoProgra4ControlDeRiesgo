import React, { useState, useEffect } from "react";
import { User, UserType } from "../../components/index";
import TableUserMaintenance from "./tableUserMaintenance";
import UserEditor from "./userEditor";

const BodyFormMaintenance: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User>({} as User);
  const [users, setUsers] = useState<User[]>([]);
  const [userTypes, setUserTypes] = useState<UserType[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => {
        // Asume que la API devuelve un array directamente
        setUsers(data);
      })
      .catch((error) => console.error("Error loading the data", error));

      fetch("/api/usertype")
      .then(response => response.json())
      .then(data => setUserTypes(data))
      .catch(error => console.error("Error loading user types:", error));
  }, []);

  const departments = ["Control", "Ambience", "Risk"];

  const handleSave = () => {
    console.log("Guardando los cambios...");
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
            departments={departments}
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
