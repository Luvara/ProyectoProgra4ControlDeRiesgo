import React from "react";
import useFormStore from "../../lib/useFormStore";

interface NewFormMaintenanceProps {
  selectedDepartment: number | null;
}

const NewFormMaintenance: React.FC<NewFormMaintenanceProps> = ({
  selectedDepartment,
}) => {
  const { createForm } = useFormStore();

  const handleCreateForm = () => {
    if (selectedDepartment !== null) {
      createForm(selectedDepartment);
    } else {
      alert("Seleccione un departamento antes de crear un formulario.");
    }
  };

  return (
    <div className="flex">
      <button
        onClick={handleCreateForm}
        disabled={selectedDepartment === null}
        className="flex p-2 border rounded-xl text-white w-52 h-12 font-bold justify-center items-center btn-form hover:bg-slate-600"
      >
        Crear Formulario
      </button>
    </div>
  );
};

export default NewFormMaintenance;
