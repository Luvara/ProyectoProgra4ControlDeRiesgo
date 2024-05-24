import React from "react";
import useFormStore from "../../lib/useFormStore"; // Asegúrate de que la ruta es correcta

const statusOptions = [
  { status: "Complete", id: "c" },
  { status: "Active", id: "a" },
  { status: "Desactivate", id: "d" },
];

interface FormConfigProps {
  formId: number; // Ahora solo necesitamos el ID del formulario para buscarlo en el store
}

const FormConfig: React.FC<FormConfigProps> = ({ formId }) => {
  const { forms, updateForm, saveForms } = useFormStore();
  const form = forms.find((f) => f.form_id === formId) || {
    form_description: "",
    form_status: "",
    form_id: 0,
  }; // Encuentra el formulario o retorna un default

  const handleChange = (newValue: string) => {
    updateForm(formId, { form_status: newValue });
  };

  const handleSave = async () => {
    try {
      await saveForms();
      alert("Forms saved successfully!");
    } catch (error) {
      alert("Failed to save forms");
    }
  };

  return (
    <div className="bg-background-4 m-5 rounded-lg flex justify-between items-center">
      <select
        className="m-4 bg-transparent text-white outline-none"
        value={form.form_status}
        onChange={(e) => handleChange(e.target.value)}
      >
        {statusOptions.map((option, index) => (
          <option className="bg-background-3" key={index} value={option.id}>
            {option.status}
          </option>
        ))}
      </select>

      <p className="m-4 text-white">{form.form_description}</p>

      <button
        onClick={handleSave}
        className="btn bg-blue-500 text-white px-4 py-2 rounded md:w-1/2"
      >
        Update Form
      </button>
    </div>
  );
};

export default FormConfig;
