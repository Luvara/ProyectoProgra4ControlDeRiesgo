import create from "zustand";
import { Question } from "../../components/index";

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
      set({ questions: questions.map(q => ({ ...q, isModified: false })) }),
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
      const modifiedQuestions = get().questions.filter(q => q.isModified);
      console.log("Modified questions:", modifiedQuestions);
      // Aquí iría la lógica para guardar solo las preguntas modificadas
      // Por ejemplo:
      // const response = await fetch('/api/saveQuestions', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(modifiedQuestions),
      // });
      // if (!response.ok) { throw new Error('Failed to save questions'); }
    },
  }));

export default useQuestionStore;
