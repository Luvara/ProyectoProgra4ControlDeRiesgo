import create from "zustand";
import { Form } from "../components/index";

interface EnhancedForm extends Form {
  isModified?: boolean; // Agregar para rastrear cambios
}

interface FormState {
  forms: EnhancedForm[];
  setForms: (forms: Form[]) => void;
  updateForm: (id: number, newData: Partial<Form>) => void;
  saveForms: () => Promise<void>;
}

const useFormStore = create<FormState>((set, get) => ({
  forms: [],
  setForms: (forms: Form[]) =>
    set({ forms: forms.map((f) => ({ ...f, isModified: false })) }),
  updateForm: (id, newData) => {
    set((state) => ({
      forms: state.forms.map((form) =>
        form.form_id === id ? { ...form, ...newData, isModified: true } : form
      ),
    }));
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
