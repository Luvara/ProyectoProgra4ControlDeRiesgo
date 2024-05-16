import create from "zustand";
import { Form, Answer } from "../components/index";

interface FormState {
  form: Form | null;
  currentPage: number;
  setForm: (form: Form) => void;
  setCurrentPage: (page: number) => void;
  updateAnswer: (sectionIndex: number, questionIndex: number, newData: Partial<Answer>) => void;
}

const useFormStore = create<FormState>((set, get) => ({
  form: null,
  currentPage: 0,
  setForm: (form: Form) => set({ form }),
  setCurrentPage: (page: number) => set({ currentPage: page }),
  updateAnswer: (sectionIndex, questionIndex, newData) => {
    const form = get().form;
    if (!form) return;

    const question = form.section[sectionIndex].question[questionIndex];
    const answer = question.answer[0] || { QUESTION_quest_id: question.quest_id };

    const updatedAnswer = { ...answer, ...newData };

    if (!question.answer[0]) {
      question.answer.push(updatedAnswer);
    } else {
      question.answer[0] = updatedAnswer;
    }

    set({ form });

    // Guardar la respuesta solo si answ_answer está presente
    if (updatedAnswer.answ_answer) {
      // Llamar a la API para upsert la respuesta en la base de datos
      fetch(`/api/answers`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAnswer),
      }).catch((error) => console.error("Error updating the answer", error));
    }
  },
}));

export default useFormStore;
