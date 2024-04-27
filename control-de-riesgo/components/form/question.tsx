const Question = ({
  question,
  index,
  sectionIndex,
  updateQuestion,
}: {
  question: any;
  index: number;
  sectionIndex: number;
  updateQuestion: any;
}) => {
  const handleResponseChange = (response) => {
    updateQuestion(sectionIndex, index, { response });
  };

  const handleObservationChange = (observation) => {
    updateQuestion(sectionIndex, index, { observation });
  };

  const handleFileChange = (event) => {
    updateQuestion(sectionIndex, index, { file: event.target.files[0] });
  };

  return (
    <div className="m-4 p-4 md:w-3/4 bg-background-4 text-white rounded-lg shadow">
      <h4 className="font-semibold">{question.text}</h4>
      <div className="my-2">
        <label>
          <input
            type="radio"
            name={`response-${index}`}
            checked={question.response === "yes"}
            onChange={() => handleResponseChange("yes")}
          />{" "}
          Yes
        </label>
        <label className="ml-4">
          <input
            type="radio"
            name={`response-${index}`}
            checked={question.response === "no"}
            onChange={() => handleResponseChange("no")}
          />{" "}
          No
        </label>
      </div>
      <textarea
        className="mt-2 p-2 border rounded w-full bg-transparent"
        placeholder="Observations"
        value={question.observation}
        onChange={(e) => handleObservationChange(e.target.value)}
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
      {question.file && (
        <p className="text-sm text-gray-500">File: {question.file.name}</p>
      )}
    </div>
  );
};

export default Question;
