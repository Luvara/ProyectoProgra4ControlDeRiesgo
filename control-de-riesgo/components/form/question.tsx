import React, { useState, useEffect } from "react";
import { Question } from "../index";
import UploadButton from "./UploadButton";

const QuestionAnswer = ({
  question,
  index,
  sectionIndex,
  updateQuestion,
}: {
  question: Question;
  index: number;
  sectionIndex: number;
  updateQuestion: (
    sectionIndex: number,
    questionIndex: number,
    newData: Partial<Question["answer"][0]>
  ) => void;
}) => {
  const initialJustification =
    question.answer.length > 0 ? question.answer[0].answ_justification : "";
  const [justification, setJustification] = useState(initialJustification);
  const [lastSavedJustification, setLastSavedJustification] =
    useState(initialJustification);

  useEffect(() => {
    setJustification(initialJustification);
    setLastSavedJustification(initialJustification);
  }, [initialJustification]);

  const handleResponseChange = (response: string) => {
    updateQuestion(sectionIndex, index, { answ_answer: response });
  };

  const handleObservationChange = (observation: string) => {
    setJustification(observation);
  };

  const handleObservationBlur = () => {
    if (justification !== lastSavedJustification) {
      updateQuestion(sectionIndex, index, {
        answ_justification: justification,
      });
      setLastSavedJustification(justification);
    }
  };

  const answer =
    question.answer.length > 0
      ? question.answer[0]
      : { answ_answer: "", answ_justification: "", answ_evidence: "", answ_id: null };

  return (
    <div
      id={`question-${sectionIndex}-${index}`}
      className="mx-10 my-3 p-4 bg-background-4 text-white rounded-lg shadow"
    >
      <h4 className="font-semibold">
        {question.quest_ordern} - {question.quest_question}
      </h4>
      <div className="my-2 flex justify-center">
        <label className="flex items-center p-3 rounded-md img-hover cursor-pointer">
          <input
            type="checkbox"
            name={`response-${index}`}
            className="w-6 h-6 bg-gray-100 border-gray-300 rounded me-3"
            checked={answer.answ_answer === "yes"}
            onChange={() => handleResponseChange("yes")}
          />{" "}
          Si.
        </label>
        <label className="flex items-center p-3 rounded-md img-hover cursor-pointer">
          <input
            type="checkbox"
            className="w-6 h-6 bg-gray-100 border-gray-300 rounded me-3"
            name={`response-${index}`}
            checked={answer.answ_answer === "no"}
            onChange={() => handleResponseChange("no")}
          />{" "}
          No.
        </label>
      </div>
      <textarea
        className="my-2 p-2 border rounded-lg w-full bg-transparent"
        placeholder="Observaciones..."
        value={justification}
        onChange={(e) => handleObservationChange(e.target.value)}
        onBlur={handleObservationBlur}
      />
      {answer.answ_evidence && (
        <div className="my-2">
          <a
            href={answer.answ_evidence}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Ver evidencia
          </a>
        </div>
      )}
      <UploadButton answ_id={answer.answ_id} answ_evidence={answer.answ_evidence} />
    </div>
  );
};

export default QuestionAnswer;
