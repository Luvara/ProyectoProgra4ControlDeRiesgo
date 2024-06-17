import React, { useEffect, useState } from 'react';
import { EmployeeResponse } from '../../../index';
import { useUser } from "../../../../lib/userContext";


const UserInfo = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState<EmployeeResponse | null>(null);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `/api/dashboard/employee/getEmployee?id=${user.usu_id}`
          );
          const data: EmployeeResponse = await response.json();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching employee:", error);
        }
      };
      fetchUserData();
    }
  }, [user]);

  return (
    <div className=" w-full p-3 text-white bg-nodes text-center">
      <div className="w-full">
        <h3 className="text-lg font-semibold mb-3">informacion del usuario</h3>
        <p><strong>Nombre: </strong>{user?.usu_name} {user?.usu_lastname} {user?.usu_slastname}</p>
        <p><strong>ID:</strong> {userData?.usu_idnumber}</p>
        <p><strong>Departamento:</strong> {userData?.department} </p>
      </div>
    </div>
  );
};

export default UserInfo;
