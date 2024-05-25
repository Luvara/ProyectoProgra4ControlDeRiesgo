import { User } from "../index";

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
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Apellido</th>
            <th className="px-4 py-2">Departamento</th>
            <th className="px-4 py-2">Rol</th>
            <th className="px-4 py-2">Desactivar</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {users.map((user) => (
            <tr
              key={user.usu_id}
              className="bg-gray-800 hover:bg-gray-600 cursor-pointer border-b border-gray-400"
              onClick={() => onSelectUser(user)}
            >
              <td className="px-4 py-2">{user.usu_idnumber}</td>
              <td className="px-4 py-2">{user.usu_name}</td>
              <td className="px-4 py-2">{user.usu_lastname}</td>
              <td className="px-4 py-2">{user.department_dep_id}</td>
              <td className="px-4 py-2">{user.usertype?.usut_role}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => onDeleteUser(user.usu_id.toString())}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Desactivar
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
