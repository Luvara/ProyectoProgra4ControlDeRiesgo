import { useState, useEffect } from "react";
import { Question } from "../index";

const QuestionAnswer = ({
  question,
  index,
  sectionIndex,
  updateQuestion,
}: {
  question: Question;
  index: number;
  sectionIndex: number;
  updateQuestion: (sectionIndex: number, questionIndex: number, newData: Partial<Question["answer"][0]>) => void;
}) => {
  const initialJustification = question.answer.length > 0 ? question.answer[0].answ_justification : "";
  const [justification, setJustification] = useState(initialJustification);
  const [lastSavedJustification, setLastSavedJustification] = useState(initialJustification);

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
      updateQuestion(sectionIndex, index, { answ_justification: justification });
      setLastSavedJustification(justification);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    updateQuestion(sectionIndex, index, { file });
  };

  const answer = question.answer.length > 0 ? question.answer[0] : { answ_answer: "", answ_justification: "" };

  return (
    <div className="m-4 p-4 md:w-3/4 bg-background-4 text-white rounded-lg shadow">
      <h4 className="font-semibold">{question.quest_question}</h4>
      <div className="my-2">
        <label>
          <input
            type="radio"
            name={`response-${index}`}
            checked={answer.answ_answer === "yes"}
            onChange={() => handleResponseChange("yes")}
          />{" "}
          Yes
        </label>
        <label className="ml-4">
          <input
            type="radio"
            name={`response-${index}`}
            checked={answer.answ_answer === "no"}
            onChange={() => handleResponseChange("no")}
          />{" "}
          No
        </label>
      </div>
      <textarea
        className="mt-2 p-2 border rounded w-full bg-transparent"
        placeholder="Observations"
        value={justification}
        onChange={(e) => handleObservationChange(e.target.value)}
        onBlur={handleObservationBlur}
      />
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
             file:mr-4 file:py-2 file:px-4
             file:rounded file:border-0
             file:text-sm file:font-semibold
             file:bg-blue-50 file:text-blue-700
             hover:file:bg-blue-100
             dark:file:bg-gray-800 dark:file:text-white dark:file:border dark:hover:file:bg-gray-700"
      />
      {/* {question.file && (
        <p className="text-sm text-gray-500">File: {question.file.name}</p>
      )} */}
    </div>
  );
};

export default QuestionAnswer;