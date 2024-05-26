import create from "zustand";
import { Question } from "../components/index";

interface QuestionState {
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  updateQuestion: (
    question_id: number,
    newData: Partial<Question>
  ) => void;
}

const useQuestionStore = create<QuestionState>((set, get) => ({
  questions: [],
  setQuestions: (questions: Question[]) => set({ questions }),
  updateQuestion: async (question_id, newData) => {
    const question = get().questions.find(
      (q) => q.quest_id === question_id
    );

    if (!question) return;

    const updatedQuestion = { ...question, ...newData };
    const questionsUpdate = get().questions.map((q) =>
      q.quest_id === updatedQuestion.quest_id ? updatedQuestion : q
    );
    set({ questions: questionsUpdate });

    // Guardar la pregunta solo si quest_question está presente y ha cambiado
    if (
      updatedQuestion.quest_question !== question.quest_question ||
      updatedQuestion.quest_ordern !== question.quest_ordern ||
      updatedQuestion.quest_deactivationdate !== question.quest_deactivationdate
    ) {
      fetch(`/api/questions`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedQuestion),
      }).catch((error) =>
        console.error("Error updating the question", error)
      );
    }
  },
}));

export default useQuestionStore;
