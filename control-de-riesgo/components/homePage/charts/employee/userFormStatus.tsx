import React, { useEffect, useState } from "react";
import { FormResponse } from "../../../index";
import { useUser } from "../../../../lib/userContext";

const UserFormStatus = () => {
  const { user } = useUser();
  const [userFormData, setUserFormData] = useState<FormResponse | null>(null);

  useEffect(() => {
    if (user) {
      const fetchUserFormData = async () => {
        try {
          const response = await fetch(
            `/api/dashboard/employee/getFormStatus?department=${user.department_dep_id}`
          );
          const data: FormResponse | null = await response.json();
          setUserFormData(data);
        } catch (error) {
          console.error("Error fetching user form data:", error);
        }
      };
      fetchUserFormData();
    }
  }, [user]);

  if (!userFormData) {
    return (
      <div className="my-4 w-full md:w-2/5 md:flex md:justify-between bg-background-3 shadow-lg rounded-lg p-5 text-white">
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-3">Form Status</h3>
          <p>No form data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-4 bg-background-3 shadow-lg rounded-lg p-5 text-white">
      <h3 className="text-lg font-semibold mb-3">Form Status</h3>
      <p>
        <strong>Form Name:</strong> {userFormData.form_name}{" "}
        {userFormData.form_status}
      </p>
    </div>
  );
};

export default UserFormStatus;
