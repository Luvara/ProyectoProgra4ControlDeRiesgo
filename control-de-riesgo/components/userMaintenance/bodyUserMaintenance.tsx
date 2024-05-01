import React, { useState, useEffect } from "react";
import { User, DataUser } from "../../components/index";
import TableUserMaintenance from "./tableUserMaintenance";
import UserEditor from "./userEditor";

const BodyFormMaintenance: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User>({} as User);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/userData.json")
      .then((response) => response.json())
      .then((data: DataUser) => setUsers(data.users))
      .catch((error) => console.error("Error loading the data", error));
  }, []);

  const departments = ["Control", "Ambience", "Risk"];
  const roles = ["Admin", "User", "BossDpt"];

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
            roles={roles}
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
