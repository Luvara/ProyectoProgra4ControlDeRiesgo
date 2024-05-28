import React from 'react';
import { EmployeeResponse } from '../../index';

const UserInfo = ({ userData }: { userData: EmployeeResponse }) => {
  return (
    <div className="my-4 w-full md:w-2/5 md:flex md:justify-between bg-background-3 shadow-lg rounded-lg p-5 text-white">
      <div className="w-full">
        <h3 className="text-lg font-semibold mb-3">User Information</h3>
        <p><strong>Name:</strong> {userData.usu_name}</p>
        <p><strong>ID:</strong> {userData.usu_idnumber}</p>
        <p><strong>Department:</strong> {userData.department}</p>
      </div>
    </div>
  );
};

export default UserInfo;
