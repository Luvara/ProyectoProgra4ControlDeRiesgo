import { User } from "../../components/index";

const TableUserMaintenance = ({
  users,
  onSelectUser,
  onDeleteUser,
}: {
  users: User[];
  onSelectUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
}) => {
  return (
    <div className="mt-8">
      <table className="w-full text-white">
        <thead>
          <tr className="bg-gray-700">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Department</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {users.map((user) => (
            <tr
              key={user.usu_id}
              className="bg-gray-800 hover:bg-gray-600 cursor-pointer"
              onClick={() => onSelectUser(user)}
            >
              <td className="px-4 py-2">{user.usu_name}</td>
              <td className="px-4 py-2">{user.usu_lastname}</td>
              <td className="px-4 py-2">{user.usu_idnumber}</td>
              <td className="px-4 py-2">{user.department_dep_id}</td>
              <td className="px-4 py-2">{user.userType_usut_id}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => onDeleteUser(user.usu_id.toString())}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUserMaintenance;
