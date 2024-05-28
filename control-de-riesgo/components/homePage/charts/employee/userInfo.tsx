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
    <div className="my-4 w-full md:w-2/5 md:flex md:justify-between bg-background-3 shadow-lg rounded-lg p-5 text-white">
      <div className="w-full">
        <h3 className="text-lg font-semibold mb-3">User Information</h3>
        <p><strong>Name:</strong> {userData?.usu_name}</p>
        <p><strong>ID:</strong> {userData?.usu_idnumber}</p>
        <p><strong>Department:</strong> {userData?.department}</p>
      </div>
    </div>
  );
};

export default UserInfo;
