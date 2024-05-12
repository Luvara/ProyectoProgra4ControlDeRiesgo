import React, { useState, useEffect } from "react";
import { Form, Data } from "../index";
import Question from "./question";
import Pagination from "./pagination";
import Button from "./button";

const BodyForm: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sections, setSections] = useState<Form[]>([]);

  useEffect(() => {
    fetch("/formData.json")
      .then((response) => response.json())
      .then((data: Data) => setSections(data.forms))
      .catch((error) => console.error("Error loading the data", error));
  }, []);

  const handlePageChange = (newPage: number): void => {
    if (newPage >= 0 && newPage < sections.length) {
      setCurrentPage(newPage);
    }
  };

  const updateQuestion = (sectionIndex, questionIndex, changes) => {
    const newSections = [...sections];
    const question = {
      ...newSections[0].sections[sectionIndex].questions[
        questionIndex
      ],
      ...changes,
    };
    newSections[0].sections[sectionIndex].questions[questionIndex] =
      question;
    setSections(newSections);
  };

  return (
    <div className="container px-5 py-14 mx-auto rounded-lg bg-background-2 body-font">
      <div className="p-2 bg-background-3 flex flex-col justify-center items-center">
        <Pagination
          currentPage={currentPage}
          totalPages={4}
          onPageChange={handlePageChange}
        />
        {sections.length > 0 && sections[0] ? (
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-4xl font-bold m-4 text-white">
              {sections[0].sections[currentPage].title}
            </h2>
            {sections[0].sections[currentPage].questions.map(
              (question, index) => (
                <Question
                  key={question.id}
                  question={question}
                  index={index}
                  sectionIndex={currentPage}
                  updateQuestion={updateQuestion}
                />
              )
            )}
          </div>
        ) : (
          <p>Loading or no data available...</p>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={4}
          onPageChange={handlePageChange}
        />
        <div className="m-2  w-full flex flex-row justify-evenly items-center">
          <Button text="Atras" color="blue" onClick={() => {}} />
          <Button text="Guardar" color="purple" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default BodyForm;
