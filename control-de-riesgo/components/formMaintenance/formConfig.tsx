import React, { useState, useEffect } from "react";
import { Form } from "../index";
import useFormStore from "../../lib/useFormStore"; // Asegúrate de que la ruta es correcta

const statusOptions = [
  { status: "Completado", id: "c" },
  { status: "Activo", id: "a" },
  { status: "Desactivado", id: "d" },
];

interface FormConfigProps {
  formId: number; // Ahora solo necesitamos el ID del formulario para buscarlo en el store
}

const FormConfig: React.FC<FormConfigProps> = ({ formId }) => {
  const { forms, updateForm, saveForms } = useFormStore();

  const form: Form | null = forms.find((f) => f.form_id === formId) || null;

  const [startDate, setStartDate] = useState<string>(
    form?.form_date_start
      ? new Date(form.form_date_start).toISOString().split("T")[0]
      : ""
  );
  const [endDate, setEndDate] = useState<string>(
    form?.form_date_finish
      ? new Date(form.form_date_finish).toISOString().split("T")[0]
      : ""
  );

  useEffect(() => {
    setStartDate(
      form?.form_date_start
        ? new Date(form.form_date_start).toISOString().split("T")[0]
        : ""
    );
    setEndDate(
      form?.form_date_finish
        ? new Date(form.form_date_finish).toISOString().split("T")[0]
        : ""
    );
  }, [form]);

  const handleChange = (newValue: string) => {
    updateForm(formId, { form_status: newValue });
  };

  const handleChangeDate = (newValue: string, field: "start" | "finish") => {
    if (field === "start") {
      setStartDate(newValue);
      updateForm(formId, { form_date_start: new Date(newValue) });
    } else {
      setEndDate(newValue);
      updateForm(formId, { form_date_finish: new Date(newValue) });
    }
  };

  const handleSave = async () => {
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      alert(
        "La fecha de finalización debe ser posterior a la fecha de inicio."
      );
      return;
    }
    try {
      await saveForms();
      alert("Forms saved successfully!");
    } catch (error) {
      alert("Failed to save forms");
    }
  };

  return (
    <div className="bg-background-4 m-5 rounded-lg flex flex-wrap justify-center items-center">
      <select
        className="m-4 bg-transparent text-white outline-none"
        value={form?.form_status}
        onChange={(e) => handleChange(e.target.value)}
      >
        {statusOptions.map((option, index) => (
          <option className="bg-background-3" key={index} value={option.id}>
            {option.status}
          </option>
        ))}
      </select>

      <p className="m-4 text-white">{form?.form_description}</p>

      <input
        type="date"
        className="m-4 bg-transparent text-white outline-none"
        disabled={form?.form_status === "c" || form?.form_status === "a"}
        value={startDate}
        onChange={(e) => handleChangeDate(e.target.value, "start")}
      />

      <input
        type="date"
        className="m-4 bg-transparent text-white outline-none"
        disabled={form?.form_status === "c" || form?.form_status === "a"}
        value={endDate}
        onChange={(e) => handleChangeDate(e.target.value, "finish")}
      />

      <button
        onClick={handleSave}
        className={`btn bg-blue-500 text-white px-4 py-2 rounded md:w-1/2 ${
          form?.form_status === "c"
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-500"
        }`}
        disabled={form?.form_status === "c"}
      >
        Update Form
      </button>
    </div>
  );
};

export default FormConfig;
