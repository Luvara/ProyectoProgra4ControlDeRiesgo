import React, { useState, useEffect } from "react";
import { Question, Answer } from "../index";
import UploadButton from "./UploadButton";
import useFormStore from "../../lib/useFormRespondStore";
import Image from "next/image";

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
      <div className="my-2 flex justify-center space-x-20 md:space-x-40">
      <button
        className={`flex p-2 border rounded-xl  w-52 h-12 font-bold justify-center items-center btn-quest hover:bg-red-700  ${
          answer?.answ_answer === 'no' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600 opacity-30'
        }`}
        onClick={() => handleResponseChange('no')}
      >
         <img
              className=" me-3 img-shadow"
              src="https://img.icons8.com/fluency/48/cancel.png"
              width={40}
              height={40}
              alt="Image"
            />
        No
      </button>
      <button
        className={`flex p-2 border rounded-xl w-52 h-12 font-bold justify-center items-center btn-quest hover:bg-green-700  ${
          answer?.answ_answer === 'yes' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600 opacity-30'
        }`}
        onClick={() => handleResponseChange('yes')}
      >
        <img
              className=" me-3 img-shadow"
              src="https://img.icons8.com/fluency/48/checked.png"
              width={40}
              height={40}
              alt="Image"
            />
        Sí
      </button>
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
