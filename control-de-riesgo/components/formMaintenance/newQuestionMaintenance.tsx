import React, { useState } from "react";
import useQuestionStore from "../../lib/useQuestionStore";
import useFormStore from "../../lib/useFormStore";

interface NewQuestionMaintenanceProps {
  formId: number; // ID del formulario actual
}

const NewQuestionMaintenance: React.FC<NewQuestionMaintenanceProps> = ({ formId }) => {
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
    <div className="md:w-3/4 flex flex-col justify-center items-center">
      <button
        className="bg-primary text-white p-2 rounded-lg"
        onClick={handleNewQuestion}
      >
        New Question
      </button>
      {showForm && (
        <div className="m-4 p-4 md:w-3/4 bg-background-4 text-white rounded-lg shadow">
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Question:</label>
            <textarea
              name="quest_question"
              className="p-2 border rounded w-full h-36 bg-transparent"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </div>

          <div className="flex justify-evenly items-center mb-4">
            <select
              name="quest_section"
              className="p-2 border rounded w-1/2 bg-transparent"
              value={sectionId ?? ""}
              onChange={(e) => setSectionId(Number(e.target.value))}
            >
              <option value="" disabled>Select Section</option>
              {currentForm?.section.map((section) => (
                <option key={section.sect_id} value={section.sect_id}>
                  {section.sect_name}
                </option>
              ))}
            </select>
            <div>
              <label className="block text-lg font-semibold mb-2">Order:</label>
              <input
                type="text"
                name="quest_ordern"
                className="mt-2 p-2 border rounded w-20 bg-transparent"
                value={questionOrder}
                onChange={(e) => setQuestionOrder(e.target.value)}
              />
            </div>
          </div>
          <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded-lg">
            Crear Pregunta
          </button>
        </div>
      )}
    </div>
  );
};

export default NewQuestionMaintenance;
