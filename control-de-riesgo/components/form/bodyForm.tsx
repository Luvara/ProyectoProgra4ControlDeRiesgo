import React, { useEffect, useState } from "react";
import { Form } from "../index";
import Question from "./question";
import Pagination from "./pagination";
import { useUser } from "../../lib/userContext";
import useFormStore from "../../lib/useFormRespondStore";
import ScrollToTopButton from "../util/buttonToTop";

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
    <div className="container flex flex-col-reverse xl:container xl:flex xl:flex-row px-5 py-14 mx-auto rounded-lg bg-background-2 body-font">
      <div className="flex flex-col bg-gray-800 text-center p-4 xl:w-96">
        <h4 className="font-bold text-white text-lg mb-4 ">
          Preguntas sin responder
        </h4>
        <p className="font-bold text-white text-lg mb-4 xl:hidden">
          S = Sección / P = Pregunta
        </p>
        <ul className="grid grid-cols-4 gap-3  xl:flex xl:flex-col xl:space-y-2 xl:gap-0 cursor-pointer">
          {unansweredQuestions.map((q, idx) => (
            <li
              key={idx}
              className={`text-white p-2 rounded-md  justify-center md:flex md:flex-row hover:bg-slate-500 ${
                (q.sectionIndex + 1) % 2 === 0 ? "bg-gray-700" : "bg-gray-900"
              }`}
              onClick={() => handlePageChange(q.sectionIndex, q.questionIndex)}
            >
              <span className="font-semibold">
                <span className="block xl:hidden">S {q.sectionIndex + 1},</span>
                <span className="hidden xl:block">
                  Sección {q.sectionIndex + 1},
                </span>
              </span>
              <span>
                <span className="block xl:hidden">
                  &nbsp;P {q.questionOrdern}
                </span>
                <span className="hidden xl:block">
                  &nbsp;Pregunta {q.questionOrdern}
                </span>
              </span>
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
          <p>Cargando o no hay datos disponibles...</p>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={form ? form.section.length : 0}
          onPageChange={handlePageChange}
        />
        <div className="m-2 w-full flex flex-row justify-end">
          <button className="flex items-center p-2 border rounded-xl text-white w-52 font-bold justify-center hover:bg-slate-600">
            <img
              className="me-2"
              width="35"
              height="35"
              src="https://img.icons8.com/ios-filled/50/ffffff/save--v1.png"
              alt="save--v1"
            />
            {/*implementar la función de guardar*/}
            Guardar
          </button>
        </div>
        <ScrollToTopButton />
      </div>
    </div>
  );
};

export default BodyForm;
