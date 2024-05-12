import { Question } from "../index";
import useQuestionStore from "../../lib/useQuestionStore";

const QuestionMaintenance = ({ question }: { question: Question }) => {
  const { updateQuestion } = useQuestionStore();

  const handleInputChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    updateQuestion(String(question.quest_id), { [name]: newValue });
  };

  return (
    <div className="m-4 p-4 md:w-3/4 bg-background-4 text-white rounded-lg shadow">
      <div className="mb-4">
        <label className="text-lg font-semibold">ID:</label>
        <span className="text-2xl font-bold ml-2">{question.quest_id}</span>
      </div>

      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">Question:</label>
        <textarea
        name="quest_question"
          className="p-2 border rounded w-full h-36 bg-transparent"
          value={question.quest_question}
          onChange={(e) => handleInputChange(e)}
        />
      </div>

      <div className="flex justify-evenly items-center mb-4">
        <div>
          <label className="block text-lg font-semibold mb-2">Active:</label>
          <input
            type="checkbox"
            name="quest_deactivationdate"
            checked={question.quest_deactivationdate == null}
            onChange={(e) => handleInputChange(e)}
            className="accent-white h-5 w-5"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Order:</label>
          <input
            type="text"
            name="quest_ordern"
            value={question.quest_ordern}
            onChange={(e) => handleInputChange(e)}
            className="mt-2 p-2 border rounded w-20  bg-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionMaintenance;
