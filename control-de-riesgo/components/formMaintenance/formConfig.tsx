import React, { useState } from "react";

const departmentOptions = ["Administrativo", "Operativo", "Financiero"];
const statusOptions = ["Evaluando", "Completado", "En Progreso"];

const FormConfig = () => {
  const [department, setDepartment] = useState(departmentOptions[0]);
  const [status, setStatus] = useState(statusOptions[0]);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="bg-background-4 m-5 rounded-lg flex justify-between items-center">
      <select
        className="m-4 bg-transparent text-white outline-none"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        {departmentOptions.map((option, index) => (
          <option className="bg-background-3" key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        className="m-4 bg-transparent text-white outline-none"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        {statusOptions.map((option, index) => (
          <option className="bg-background-3" key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <p className="m-4 text-white">Acá va la descripcion del formulario</p>
    </div>
  );
};

export default FormConfig;
