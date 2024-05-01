import React from "react";
import { User } from "../../components/index";

interface UserEditorProps {
  user: User;
  departments: string[];
  roles: string[];
  onSave: () => void;
  onUpdateUser: (user: User) => void;
}

const UserEditor: React.FC<UserEditorProps> = ({
  user,
  departments,
  roles,
  onSave,
  onUpdateUser,
}) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg space-y-4 flex flex-col justify-center items-center w-full">
      <div className="flex flex-wrap items-center justify-center">
        <div className="mx-2 text-white text-center">
          <p>Name: {user.name}</p>
          <p>ID Number: {user.number}</p>
          <p>Email: {user.email}</p>
        </div>

        <div className="mx-2 flex flex-col">
          <select
            value={user.department}
            onChange={(e) =>
              onUpdateUser({ ...user, department: e.target.value })
            }
            className="select bg-gray-700 text-white p-2 m-2"
          >
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>

          <select
            value={user.userType}
            onChange={(e) =>
              onUpdateUser({ ...user, userType: e.target.value })
            }
            className="select bg-gray-700 text-white p-2 m-2"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={onSave}
        className="btn bg-blue-500 text-white px-4 py-2 rounded md:w-1/2"
      >
        Save
      </button>
    </div>
  );
};

export default UserEditor;
