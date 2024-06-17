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
      <div className="my-4 w-full p-5 text-white bg-nodes text-center">
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-3">Estado del formulario</h3>
          <p>No hay datos de formulario disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-4 w-full p-5 text-white bg-nodes text-center">
      <h3 className="text-lg font-semibold mb-3">Estado del formulario</h3>
      <p>
        <strong>Nombre del formulario:</strong> {userFormData.form_name}{": "}
        {userFormData.form_status}
      </p>
    </div>
  );
};

export default UserFormStatus;
