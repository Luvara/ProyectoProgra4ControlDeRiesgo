import React, { useEffect, useState } from "react";
import { Form } from "../index";
import Question from "./question";
import Pagination from "./pagination";
import Button from "./button";
import { useUser } from "../../lib/userContext";
import useFormStore from "../../lib/useFormRespondStore";

const BodyForm: React.FC = () => {
  const { user } = useUser();

  const {
    form,
    currentPage,
    setForm,
    setCurrentPage,
    updateAnswer,
    unansweredQuestions,
    checkUnansweredQuestions,
  } = useFormStore();

  useEffect(() => {
    if (
      user?.department_dep_id &&
      user?.usu_torespond === "y" &&
      user?.usu_state === "A" &&
      (user?.userType_usut_id === 4 || user?.userType_usut_id === 5)
    ) {
      fetch(`/api/forms/${user.department_dep_id}`)
        .then((response) => response.json())
        .then((data: Form) => {
          setForm(data);
          checkUnansweredQuestions();
        })
        .catch((error) => console.error("Error loading the data", error));
    }
  }, [user]);

  const handlePageChange = (newPage: number, questionIndex?: number): void => {
    if (form && newPage >= 0 && newPage < form.section.length) {
      setCurrentPage(newPage);
      if (questionIndex !== undefined) {
        setTimeout(() => {
          const questionElement = document.getElementById(
            `question-${newPage}-${questionIndex}`
          );
          questionElement?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 0);
      }
    }
  };

  return (
    <div className="container md:flex px-5 py-14 mx-auto rounded-lg bg-background-2 body-font">
      <div className="bg-gray-800 hidden md:flex md:flex-col p-4 shadow-xl md:w-80">
        <h4 className="font-bold text-white text-lg mb-4">
          Preguntas sin responder
        </h4>
        <ul className="space-y-2">
          {unansweredQuestions.map((q, idx) => (
            <li
              key={idx}
              className={`text-white p-2 rounded-md ${
                (q.sectionIndex + 1) % 2 === 0 ? "bg-gray-700" : "bg-gray-900"
              }`}
              onClick={() => handlePageChange(q.sectionIndex, q.questionIndex)}
            >
              <span className="font-semibold">
                Sección {q.sectionIndex + 1}
              </span>
              , Pregunta {q.questionOrdern}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-2 bg-background-3 flex flex-col justify-center items-center w-full">
        <Pagination
          currentPage={currentPage}
          totalPages={form ? form.section.length : 0}
          onPageChange={handlePageChange}
        />
        {form && form.section.length > 0 ? (
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-4xl font-bold m-4 text-white">
              {form.section[currentPage].sect_name}
            </h2>
            {form.section[currentPage].question.map((question, index) => (
              <Question
                key={question.quest_id}
                question={question}
                index={index}
                sectionIndex={currentPage}
                updateQuestion={updateAnswer}
              />
            ))}
          </div>
        ) : (
          <p>Loading or no data available...</p>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={form ? form.section.length : 0}
          onPageChange={handlePageChange}
        />
        <div className="m-2 w-full flex flex-row justify-evenly items-center">
          <Button
            text="Atras"
            color="blue"
            onClick={() => handlePageChange(currentPage - 1)}
          />
          <Button
            text="Guardar"
            color="purple"
            onClick={() => {
              /* Handle save */
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BodyForm;
