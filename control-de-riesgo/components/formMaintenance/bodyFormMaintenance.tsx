import React, { useState, useEffect } from "react";
import { Form, Question, Section } from "../../components/index";
import Card from "../card";
import QuestionMaintenance from "./questionMaintenance";
import Pagination from "../form/pagination";
import Button from "../form/button";
import FormConfig from "./formConfig";

const BodyFormMaintenance: React.FC = () => {
  const [activeForm, setActiveForm] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedForm, setSelectedForm] = useState<Form>({} as Form);
  const [data, setData] = useState<Form[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/forms").then((res) => res.json()),
      fetch("/api/sections").then((res) => res.json()),
      fetch("/api/questions").then((res) => res.json()),
    ])
      .then(
        ([formsData, sectionsData, questionsData]: [
          Form[],
          Section[],
          Question[]
        ]) => {
          console.log("Forms Data:", formsData);
          console.log("Sections Data:", sectionsData);
          console.log("Questions Data:", questionsData);

          const forms: Form[] = formsData.map((form: Form) => ({
            ...form,
            sections: sectionsData
              .filter(
                (section: Section) => section.FORM_form_id === form.form_id
              )
              .map((section: Section) => ({
                ...section,
                questions: questionsData.filter(
                  (question: Question) =>
                    question.SECTION_sect_id === section.sect_id
                ),
              })),
          }));
          setData(forms);
          setSelectedForm(forms[0]);
          console.log("Data loaded", forms);
        }
      )
      .catch((error) => {
        console.error("Error loading the data", error);
      });
  }, []);

  const handleSectionChange = (formIndex: any) => {
    setActiveForm(formIndex);
    setCurrentPage(0);
  };

  const handlePageChange = (newPage: number): void => {
    if (newPage >= 0 && newPage < data[activeForm]?.sections.length) {
      setCurrentPage(newPage);
    }
  };

  const svgs = [
    "/Ambience.svg",
    "/Risk.svg",
    "/Control.svg",
    "/Systems.svg",
    "/Follow-up.svg",
  ];

  return (
    <div className="container px-5 py-14 mx-auto rounded-lg bg-background-2 body-font">
      <div className="bg-background-3 flex flex-col justify-center items-center">
        <div className="flex justify-center items-center flex-wrap md:flex-row">
          {data.map((form, index) => (
            <Card
              key={form.form_id}
              svg={svgs[index]}
              title={form.form_name}
              onClick={() => {
                handleSectionChange(index);
                setSelectedForm(data[index]);
              }}
            />
          ))}
        </div>

        {selectedForm && (
          <FormConfig
            form={selectedForm}
            onSave={() => {
              console.log("Save");
            }}
            onUpdateForm={setSelectedForm}
          />
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={data[activeForm]?.sections.length || 0}
          onPageChange={handlePageChange}
        />

        {data.length > 0 &&
        data[activeForm] &&
        data[activeForm].sections[currentPage] ? (
          <div className="w-full flex flex-col justify-center items-center">
            <h2 className="text-4xl font-bold m-4 text-white">
              {data[activeForm].sections[currentPage].sect_name}
            </h2>
            {data[activeForm].sections[currentPage].questions.map(
              (question, index) => (
                <QuestionMaintenance
                  key={question.quest_id}
                  question={question}
                />
              )
            )}
          </div>
        ) : (
          <p>Loading or no data available...</p>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={data[activeForm]?.sections.length || 0}
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
