import React from "react";
import { FormResponse } from "../../index";

interface UserFormStatusProps {
  userFormData: FormResponse | null;
}

const UserFormStatus = ({ userFormData }: UserFormStatusProps) => {
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
    <div className="my-4 w-full md:w-2/5 md:flex md:justify-between bg-background-3 shadow-lg rounded-lg p-5 text-white">
      <div className="w-full">
        <h3 className="text-lg font-semibold mb-3">Form Status</h3>
        <p>
          <strong>Form Name:</strong> {userFormData.form_name} {" "} {userFormData.form_status}
        </p>
      </div>
    </div>
  );
};

export default UserFormStatus;
