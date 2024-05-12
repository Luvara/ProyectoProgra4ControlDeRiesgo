import { useState } from "react";
import { Form, DepartmentType } from "../index";

const statusOptions = [
  { status: "Complete", id: "c" },
  { status: "Active", id: "a" },
  { status: "Desactivate", id: "d" },
];

interface FormConfigProps {
  onSave: () => void;
  departments: DepartmentType[];
}

const NewFormMaintenance: React.FC<FormConfigProps> = ({
  onSave,
  departments,
}) => {
    const [form, setForm] = useState<Form>({} as Form);

  return (
    <div className="bg-background-4 m-5 rounded-lg flex justify-between items-center">
      <select
        className="m-4 bg-transparent text-white outline-none"
        value={form.form_status}
        onChange={(e) => setForm({ ...form, form_status: e.target.value })}
      >
        {statusOptions.map((option, index) => (
          <option className="bg-background-3" key={index} value={option.id}>
            {option.status}
          </option>
        ))}
      </select>

      <select
            value={form.DEPARTMENT_dep_id}
            onChange={(e) =>
                setForm({ ...form, DEPARTMENT_dep_id: Number(e.target.value) })
            }
            className="select bg-gray-700 text-white p-2 m-2"
          >
            {departments.map((department) => (
              <option key={department.dep_id} value={department.dep_id}>
                {department.dep_name}
              </option>
            ))}
          </select>

      <p className="m-4 text-white">{form.form_description}</p>

      <button
        onClick={onSave}
        className="btn bg-blue-500 text-white px-4 py-2 rounded md:w-1/2"
      >
        Create Form
      </button>
    </div>
  );
};

export default NewFormMaintenance;
