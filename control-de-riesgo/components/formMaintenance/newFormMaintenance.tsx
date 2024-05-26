import { useState } from "react";
import { DepartmentType } from "../index";
import useFormStore from "../../lib/useFormStore";

interface FormConfigProps {
  departments: DepartmentType[];
}

const NewFormMaintenance: React.FC<FormConfigProps> = ({ departments }) => {
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );
  const { createForm } = useFormStore();

  const handleCreateForm = () => {
    if (selectedDepartment !== null) {
      createForm(selectedDepartment);
    } else {
      alert("Please select a department before creating a form.");
    }
  };

  return (
    <div className="bg-background-4 m-5 rounded-lg flex justify-between items-center">
      <select
        value={selectedDepartment ?? ""}
        onChange={(e) => setSelectedDepartment(Number(e.target.value))}
        className="select bg-gray-700 text-white p-2 m-2"
      >
        <option value="" disabled>
          Select Department
        </option>
        {departments.map((department) => (
          <option key={department.dep_id} value={department.dep_id}>
            {department.dep_name}
          </option>
        ))}
      </select>

      <button
        onClick={handleCreateForm}
        disabled={selectedDepartment === null}
        className={`btn text-white px-4 py-2 rounded md:w-1/2 ${
          selectedDepartment === null
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-500"
        }`}
      >
        Create Form
      </button>
    </div>
  );
};

export default NewFormMaintenance;
