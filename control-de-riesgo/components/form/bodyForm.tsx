import { useEffect } from "react";
import { Form } from "../index";
import Question from "./question";
import Pagination from "./pagination";
import Button from "./button";
import { useUser } from "../../lib/userContext";
import useFormStore from "../../lib/useFormRespondStore";

const BodyForm: React.FC = () => {
  const { user } = useUser();
  const { form, currentPage, setForm, setCurrentPage, updateAnswer } = useFormStore();

  useEffect(() => {
    if (user?.department_dep_id) {
      fetch(`/api/forms/${user.department_dep_id}`)
        .then((response) => response.json())
        .then((data: Form) => setForm(data))
        .catch((error) => console.error("Error loading the data", error));
    }
  }, [user]);

  const handlePageChange = (newPage: number): void => {
    if (form && newPage >= 0 && newPage < form.section.length) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container px-5 py-14 mx-auto rounded-lg bg-background-2 body-font">
      <div className="p-2 bg-background-3 flex flex-col justify-center items-center">
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
          <Button text="Atras" color="blue" onClick={() => handlePageChange(currentPage - 1)} />
          <Button text="Guardar" color="purple" onClick={() => { /* Handle save */ }} />
        </div>
      </div>
    </div>
  );
};

export default BodyForm;
