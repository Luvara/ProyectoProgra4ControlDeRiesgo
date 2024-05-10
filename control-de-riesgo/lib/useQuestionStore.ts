import create from "zustand";
import { Question } from "../components/index";

interface EnhancedQuestion extends Question {
  isModified: boolean;
}

interface QuestionState {
  questions: EnhancedQuestion[];
  setQuestions: (questions: Question[]) => void;
  updateQuestion: (id: string, newData: Partial<Question>) => void;
  saveQuestions: () => Promise<void>;
}

const useQuestionStore = create<QuestionState>((set, get) => ({
  questions: [],
  setQuestions: (questions: Question[]) =>
    set({ questions: questions.map((q) => ({ ...q, isModified: false })) }),
  updateQuestion: (id, newData) => {
    set((state) => ({
      questions: state.questions.map((question) =>
        String(question.quest_id) === String(id)
          ? { ...question, ...newData, isModified: true }
          : question
      ),
    }));
  },
  saveQuestions: async () => {
    const modifiedQuestions = get().questions.filter((q) => q.isModified);

    // Limpia las preguntas eliminando la propiedad 'isModified'
    const cleanQuestions = modifiedQuestions.map(
      ({ isModified, ...rest }) => rest
    );

    console.log("Modified questions:", modifiedQuestions);
    console.log("Clean questions for update:", cleanQuestions);

    try {
      const response = await fetch("/api/questions", {
        method: "PUT", // Asegúrate de que tu API acepta PUT para múltiples elementos
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanQuestions),
      });
      if (!response.ok) throw new Error("Failed to save questions");
      const savedQuestions = await response.json();
      console.log("Saved questions:", savedQuestions);

      // Opcional: resetear la bandera isModified si la respuesta es exitosa
      set((state) => ({
        questions: state.questions.map((q) => ({
          ...q,
          isModified: false,
        })),
      }));
    } catch (error) {
      console.error("Error saving questions:", error);
    }
  },
}));

export default useQuestionStore;
