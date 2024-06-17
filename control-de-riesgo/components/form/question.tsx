import React, { useState, useEffect } from "react";
import { Question, Answer } from "../index";
import UploadButton from "./UploadButton";
import useFormStore from "../../lib/useFormRespondStore";

const QuestionAnswer = ({
  question,
  index,
  sectionIndex,
}: {
  question: Question;
  index: number;
  sectionIndex: number;
}) => {
  const { updateAnswer } = useFormStore();
  const [answer, setAnswer] = useState(question.answer[0] || {} as Answer);

  useEffect(() => {
    setAnswer(question.answer[0] || {});
  }, [question]);

  const handleResponseChange = (response: string) => {
    updateAnswer(sectionIndex, index, { answ_answer: response }, (updatedAnswer) => {
      setAnswer(updatedAnswer);
    });
  };

  const handleObservationChange = (observation: string) => {
    setAnswer((prev) => ({ ...prev, answ_justification: observation }));
  };

  const handleObservationBlur = () => {
    if (answer?.answ_justification !== question.answer[0]?.answ_justification) {
      updateAnswer(sectionIndex, index, {
        answ_justification: answer?.answ_justification || "",
      });
    }
  };

  const handleUploadSuccess = (url: string) => {
    updateAnswer(sectionIndex, index, { answ_evidence: url }, (updatedAnswer) => {
      setAnswer(updatedAnswer);
    });
  };

  return (
    <div
      id={`question-${sectionIndex}-${index}`}
      className="mx-10 my-3 p-4 bg-background-4 text-white rounded-lg shadow w-full"
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
            checked={answer?.answ_answer === "yes"}
            onChange={() => handleResponseChange("yes")}
          />{" "}
          Si.
        </label>
        <label className="flex items-center p-3 rounded-md img-hover cursor-pointer">
          <input
            type="checkbox"
            className="w-6 h-6 bg-gray-100 border-gray-300 rounded me-3"
            name={`response-${index}`}
            checked={answer?.answ_answer === "no"}
            onChange={() => handleResponseChange("no")}
          />{" "}
          No.
        </label>
      </div>
      <textarea
        className="my-2 p-2 border rounded-lg w-full bg-transparent"
        placeholder="Observaciones..."
        value={answer?.answ_justification || ""}
        onChange={(e) => handleObservationChange(e.target.value)}
        onBlur={handleObservationBlur}
      />
      {answer?.answ_evidence && (
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
      <UploadButton
        answer={answer}
        answ_evidence={answer?.answ_evidence || ""}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
};

export default QuestionAnswer;
