import create from "zustand";
import { Form, Question, Section } from "../components/index";
import useQuestionStore from "./useQuestionStore";

interface EnhancedForm extends Form {
  isModified?: boolean; // Agregar para rastrear cambios
}

interface FormState {
  forms: EnhancedForm[];
  setForms: (forms: Form[]) => void;
  updateForm: (id: number, newData: Partial<Form>) => void;
  createForm: (departmentId: number) => void;
  saveForms: () => Promise<void>;
}

const useFormStore = create<FormState>((set, get) => ({
  forms: [],
  setForms: (forms: Form[]) =>
    set({ forms: forms.map((f) => ({ ...f, isModified: false })) }),
  updateForm: (id, newData) => {
    set((state) => ({
      forms: state.forms.map((form) =>
        form.form_id === id &&
        (newData.form_status !== "c" && form.form_status !== "c")
          ? { ...form, ...newData, isModified: true }
          : form
      ),
    }));
  },
  createForm: async (departmentId: number) => {
    try {
      const response = await fetch(`/api/forms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ departmentId }),
      });
      if (!response.ok) throw new Error("Failed to create form");
      const newForm = await response.json();

      set((state) => ({
        forms: [...state.forms, { ...newForm, isModified: false }],
      }));

      // Actualizar las preguntas en el store de preguntas
      const newQuestions = newForm.section.flatMap(
        (section: Section) => section.question
      );
      const { setQuestions, questions } = useQuestionStore.getState();
      setQuestions([...questions, ...newQuestions]);
    } catch (error) {
      console.error("Error creating form:", error);
    }
  },
  saveForms: async () => {
    const modifiedForms = get().forms.filter((f) => f.isModified);
    const cleanForms = modifiedForms.map(
      ({ isModified, section, ...rest }) => rest
    );
    console.log("Modified forms:", cleanForms);
    try {
      const response = await fetch("/api/forms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanForms),
      });
      if (!response.ok) throw new Error("Failed to save forms");
      const savedForms = await response.json();
      console.log("Saved forms:", savedForms);
      // Reset the isModified flag
      set((state) => ({
        forms: state.forms.map((form) => ({ ...form, isModified: false })),
      }));
    } catch (error) {
      console.error("Error saving forms:", error);
    }
  },
}));

export default useFormStore;
