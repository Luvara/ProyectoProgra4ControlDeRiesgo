import { Question } from "../../components/index";

const QuestionMaintenance = ({ question }: { question: Question }) => {
  return (
    <div className="m-4 p-4 md:w-3/4 bg-background-4 text-white rounded-lg shadow">
      <div className="mb-4">
        <label className="text-lg font-semibold">ID:</label>
        <span className="text-2xl font-bold ml-2">{question.id}</span>
      </div>

      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">Question:</label>
        <textarea
          className="p-2 border rounded w-full h-36 bg-transparent"
          value={question.text}
        />
      </div>

      <div className="flex justify-evenly items-center mb-4">
        <div>
          <label className="block text-lg font-semibold mb-2">Active:</label>
          <input
            type="checkbox"
            checked={question.active}
            className="accent-white h-5 w-5"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Order:</label>
          <input
            type="text"
            value={question.order}
            className="mt-2 p-2 border rounded w-20  bg-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionMaintenance;
