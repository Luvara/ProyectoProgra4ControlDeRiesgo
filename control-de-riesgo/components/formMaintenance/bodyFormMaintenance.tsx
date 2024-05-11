import React, { useState, useEffect } from "react";
import { Form, Question, Section, Department } from "../../components/index";
import useQuestionStore from "../../lib/useQuestionStore";
import useFormStore from "../../lib/useFormStore";
import Card from "../card";
import QuestionMaintenance from "./questionMaintenance";
import Pagination from "../form/pagination";
import Button from "../form/button";
import FormConfig from "./formConfig";
import TableFormMaintenance from "./tableFormsMaintenance";
import NewFormMaintenance from "./newFormMaintenance";

const BodyFormMaintenance: React.FC = () => {
  const [activeDepartment, setActiveDepartment] = useState(0);
  const [activeForm, setActiveForm] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState<Department[]>([]);
  const [selectedForm, setSelectedForm] = useState<Form>({} as Form);

  const { saveQuestions, setQuestions, questions } = useQuestionStore();
  const { forms, setForms, updateForm } = useFormStore();

  useEffect(() => {
    fetch("/api/departments")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        const allQuestions = data.flatMap((dept: Department) =>
          dept.axisform.flatMap((form) =>
            form.section.flatMap((sec) => sec.question)
          )
        );
        setQuestions(allQuestions);
        setForms(data.flatMap((dept: Department) => dept.axisform));
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, []);

  const handleSectionChange = (formIndex: any) => {
    setActiveDepartment(formIndex);
    setCurrentPage(0);
  };

  const handlePageChange = (newPage: number): void => {
    if (
      newPage >= 0 &&
      newPage < data[activeDepartment]?.axisform[activeForm].section.length
    ) {
      setCurrentPage(newPage);
    }
  };

  const handleSave = async () => {
    try {
      await saveQuestions();
      alert("Questions saved successfully!");
    } catch (error) {
      alert("Failed to save questions");
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
          {data.map((department, index) => (
            <Card
              key={department.dep_id}
              svg={svgs[index]}
              title={department.dep_name}
              onClick={() => {
                handleSectionChange(index);
                setSelectedForm(data[index].axisform[0]);
              }}
            />
          ))}
        </div>

        <NewFormMaintenance onSave={() => {}} departments={data} />

        <TableFormMaintenance
          forms={forms.filter((q) => q.DEPARTMENT_dep_id === data[activeDepartment].dep_id)}
          onSelectform={setSelectedForm}
        />

        {selectedForm && <FormConfig formId={selectedForm.form_id} />}

        <Pagination
          currentPage={currentPage}
          totalPages={4}
          onPageChange={handlePageChange}
        />

        {selectedForm.form_id ? (
          <div className="w-full flex flex-col justify-center items-center">
            <h2 className="text-4xl font-bold m-4 text-white">
              {selectedForm.section[currentPage].sect_name}
            </h2>
            {questions
              .filter(
                (q) =>
                  q.SECTION_sect_id ===
                  selectedForm.section[currentPage].sect_id
              )
              .map((question, index) => (
                <QuestionMaintenance
                  key={question.quest_id}
                  question={question}
                />
              ))}
          </div>
        ) : (
          <p>Loading or no data available...</p>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={
            data[activeForm]?.axisform[activeForm].section.length || 0
          }
          onPageChange={handlePageChange}
        />

        <div className="m-5 w-full flex flex-row justify-evenly items-center">
          <Button text="Atras" color="blue" onClick={() => {}} />
          <Button text="Guardar" color="purple" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default BodyFormMaintenance;
