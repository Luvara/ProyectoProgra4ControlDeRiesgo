import React, { useState } from "react";
import useQuestionStore from "../../lib/useQuestionStore";
import useFormStore from "../../lib/useFormStore";

interface NewQuestionMaintenanceProps {
  formId: number; // ID del formulario actual
}

const NewQuestionMaintenance: React.FC<NewQuestionMaintenanceProps> = ({
  formId,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [questionOrder, setQuestionOrder] = useState("");
  const [sectionId, setSectionId] = useState<number | null>(null);
  const { createQuestion } = useQuestionStore();
  const { forms } = useFormStore();

  // Buscar el formulario actual
  const currentForm = forms.find((form) => form.form_id === formId);

  const handleNewQuestion = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = () => {
    if (questionText && questionOrder && sectionId !== null) {
      createQuestion({
        quest_question: questionText,
        quest_ordern: questionOrder,
        SECTION_sect_id: sectionId,
        quest_deactivationdate: null,
        quest_version: 1,
      });
      setShowForm(false);
      setQuestionText("");
      setQuestionOrder("");
      setSectionId(null);
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      {/* boton de nueva pregunta */}
      <button
        className="flex p-2 border rounded-xl text-white w-52 h-12 font-bold justify-center items-center btn-form hover:bg-slate-600 mb-8"
        onClick={handleNewQuestion}
      >
        Nueva Pregunta
      </button>
      {/* nueva pregunta */}
      {showForm && (
        <div className=" flex flex-col w-full p-4 bg-gray-800 text-white rounded-lg shadow node-shadow">
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">
              Pregunta:
            </label>
            <textarea
              name="quest_question"
              className="p-2 border rounded w-full h-36 bg-background-4"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </div>
          {/* seccion ejes y pocision */}
          <div className="flex flex-col w-full justify-center items-center mb-4">
            <select
              name="quest_section"
              className="flex bg-transparent text-center border rounded-lg p-2 hover:bg-slate-600"
              value={sectionId ?? ""}
              onChange={(e) => setSectionId(Number(e.target.value))}
            >
              <option className="bg-background-3" value="" disabled>
                Seleccionar Eje
              </option>
              {currentForm?.section.map((section) => (
                <option
                  className="bg-background-3"
                  key={section.sect_id}
                  value={section.sect_id}
                >
                  {section.sect_name}
                </option>
              ))}
            </select>
            <div>
              <label className="block text-lg font-semibold my-2">
                Posición:
              </label>
              <input
                type="text"
                name="quest_ordern"
                className="w-24 bg-transparent text-center border rounded-lg p-2"
                value={questionOrder}
                onChange={(e) => setQuestionOrder(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={handleSubmit}
              className="flex p-2 border rounded-xl text-white w-52 h-12 font-bold justify-center items-center btn-form hover:bg-slate-600 mb-2"
            >
              Crear Pregunta
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewQuestionMaintenance;
