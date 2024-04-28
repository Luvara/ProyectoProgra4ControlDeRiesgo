import { Question } from "../../components/index";

const QuestionMaintenance = ({ question }: { question: Question }) => {
  return (
    <div className="m-4 p-4 md:w-3/4 bg-background-4 text-white rounded-lg shadow">
        <label className="text-2xl font-bold">ID: {question.id}</label>
        <input type="text" value={question.order} className="mt-2 p-2 border rounded w-full bg-transparent" />
      <textarea
        className="mt-2 p-2 border rounded w-full h-36 bg-transparent"
        value={question.text}
      />
    </div>
  );
};

export default QuestionMaintenance;
