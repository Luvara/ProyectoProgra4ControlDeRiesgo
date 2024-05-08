import { useState } from "react";
import { Form } from "../../components/index";

const statusOptions = [
  { status: "Complete", id: "c" },
  { status: "Active", id: "a" },
  { status: "Desactivate", id: "d" },
];

interface FormConfigProps {
  form: Form;
  onSave: () => void;
  onUpdateForm: (form: Form) => void;
}

const FormConfig: React.FC<FormConfigProps> = ({
  form,
  onSave,
  onUpdateForm,
}) => {
  return (
    <div className="bg-background-4 m-5 rounded-lg flex justify-between items-center">
      <select
        className="m-4 bg-transparent text-white outline-none"
        value={form.form_status}
        onChange={(e) => onUpdateForm({ ...form, form_status: e.target.value })}
      >
        {statusOptions.map((option, index) => (
          <option className="bg-background-3" key={index} value={option.id}>
            {option.status}
          </option>
        ))}
      </select>

      <p className="m-4 text-white">{form.form_description}</p>

      <button
        onClick={onSave}
        className="btn bg-blue-500 text-white px-4 py-2 rounded md:w-1/2"
      >
        Save
      </button>
    </div>
  );
};

export default FormConfig;
