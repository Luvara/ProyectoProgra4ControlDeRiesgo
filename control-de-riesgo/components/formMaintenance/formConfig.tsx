import React, { useState, useEffect } from "react";
import { Form } from "../index";
import useFormStore from "../../lib/useFormStore";

const statusOptions = [
  { status: "Completo", id: "c" },
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
    <div className="flex flex-col bg-gray-800 w-full rounded-xl items-center text-white node-shadow pb-3">
      {/* titulos */}
      <div className="hidden lg:flex bg-gray-700 w-full h-10 items-center rounded-t-xl border-b font-bold">
        <p className="w-1/4">Estado</p>
        <p className="w-1/4">Descripción</p>
        <p className="w-1/4">Fecha de Inicio</p>
        <p className="w-1/4">Fecha de Fin</p>
      </div>
      {/* ajustes */}
      <div className="flex flex-col p-5 space-y-4 w-full lg:h-14 lg:flex-row lg:p-0 lg:space-y-0 items-center">
        {/* div estado */}
        <div className=" px-4 lg:w-1/4">
          <select
            className={`flex w-full bg-transparent text-center border rounded-lg p-2 ${
              form?.form_status === "c"
                ? "cursor-not-allowed"
                : "hover:bg-slate-600"
            }`}
            disabled={form?.form_status === "c"}
            value={form?.form_status}
            onChange={(e) => handleChange(e.target.value)}
          >
            {statusOptions.map((option, index) => (
              <option className="bg-background-3" key={index} value={option.id}>
                {option.status}
              </option>
            ))}
          </select>
        </div>
        {/* div descripcion */}
        <div className="lg:w-1/4">
          <p className="mb-2 lg:hidden">Descripción:</p>
          <p className="text-white">{form?.form_description}</p>
        </div>
        {/* div fecha inicio */}
        <div className="px-4 lg:w-1/4">
          <p className="mb-2 lg:hidden">Fecha de Inicio:</p>
          <input
            type="date"
            className={`flex w-full bg-transparent h-10 text-center border rounded-lg p-2 justify-center  ${
              form?.form_status === "c" || form?.form_status === "a"
                ? "cursor-not-allowed"
                : "hover:bg-slate-600"
            }`}
            disabled={form?.form_status === "c" || form?.form_status === "a"}
            value={startDate}
            onChange={(e) => handleChangeDate(e.target.value, "start")}
          />
        </div>
        {/* div fecha fin */}
        <div className=" px-4 lg:w-1/4">
          <p className="mb-2 lg:hidden">Fecha de Finalización:</p>
          <input
            type="date"
            className={`flex w-full bg-transparent h-10 text-center border rounded-lg p-2 justify-center  ${
              form?.form_status === "c" || form?.form_status === "a"
                ? "cursor-not-allowed"
                : "hover:bg-slate-600"
            }`}
            disabled={form?.form_status === "c" || form?.form_status === "a"}
            value={endDate}
            onChange={(e) => handleChangeDate(e.target.value, "finish")}
          />
        </div>
      </div>

      <div className="flex w-full h-14 items-center justify-center">
        <button
          onClick={handleSave}
          className={`p-2 border rounded-xl w-52 font-bold btn-form  ${
            form?.form_status === "c"
              ? " cursor-not-allowed"
              : "hover:bg-slate-600"
          }`}
          disabled={form?.form_status === "c"}
        >
          Actualizar Formulario
        </button>
      </div>
    </div>
  );
};

export default FormConfig;
