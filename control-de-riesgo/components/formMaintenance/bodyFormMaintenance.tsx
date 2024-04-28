import React, { useState, useEffect } from "react";
import Card from "../card";
import Question from "../form/question";
import Pagination from "../form/pagination";
import Button from "../form/button";

const BodyFormMaintenance: React.FC = () => {
  const [activeForm, setActiveForm] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [sections, setSections] = useState<Form[]>([]);

  interface Question {
    id: number;
    text: string;
    response: boolean | null;
    observation: string;
    file: File | null;
  }

  interface Section {
    title: string;
    questions: Question[];
  }

  interface Form {
    formName: string;
    sections: Section[];
  }

  interface Data {
    forms: Form[];
  }

  useEffect(() => {
    fetch("/formData.json")
      .then((response) => response.json())
      .then((data: Data) => setSections(data.forms))
      .catch((error) => console.error("Error loading the data", error));
  }, []);

  const handleSectionChange = (formIndex) => {
    setActiveForm(formIndex);
    setCurrentPage(0);
  };

  const handlePageChange = (newPage: number): void => {
    if (newPage >= 0 && newPage < sections.length) {
      setCurrentPage(newPage);
    }
  };

  const updateQuestion = (sectionIndex, questionIndex, changes) => {
    const newSections = [...sections];
    const question = {
      ...newSections[activeForm].sections[sectionIndex].questions[
        questionIndex
      ],
      ...changes,
    };
    newSections[activeForm].sections[sectionIndex].questions[questionIndex] =
      question;
    setSections(newSections);
  };

  return (
    <div className="container px-5 py-14 mx-auto rounded-lg bg-background-2 body-font">
      <div className="bg-background-3 flex flex-col justify-center items-center">
        <div className="flex justify-center items-center flex-wrap md:flex-row">
          <Card
            svg={"/Ambience.svg"}
            title="Ambience"
            onClick={() => handleSectionChange(0)}
          />
          <Card
            svg={"/Risk.svg"}
            title="Risk"
            onClick={() => handleSectionChange(1)}
          />
          <Card
            svg={"/Control.svg"}
            title="Control"
            onClick={() => handleSectionChange(2)}
          />
          <Card
            svg={"/Systems.svg"}
            title="Systems"
            onClick={() => handleSectionChange(3)}
          />
          <Card
            svg={"/Follow-up.svg"}
            title="Follow-up"
            onClick={() => handleSectionChange(4)}
          />
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={4}
          onPageChange={handlePageChange}
        />

        {sections.length > 0 && sections[activeForm] ? (
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-4xl font-bold m-4 text-white">
              {sections[activeForm].sections[currentPage].title}
            </h2>
            {sections[activeForm].sections[currentPage].questions.map(
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
        <div className="m-5 w-full flex flex-row justify-evenly items-center">
          <Button text="Atras" color="blue" onClick={() => {}} />
          <Button text="Guardar" color="purple" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default BodyFormMaintenance;
