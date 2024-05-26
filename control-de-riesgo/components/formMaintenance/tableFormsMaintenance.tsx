import { Form } from "../index";

const TableFormMaintenance = ({
  forms,
  onSelectform,
}: {
  forms: Form[];
  onSelectform: (form: Form) => void;
}) => {
  return (
    <div className="mt-8">
      <table className="w-full text-white">
        <thead>
          <tr className="bg-gray-700">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Fecha Inicio</th>
            <th className="px-4 py-2">Fecha Fin</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {forms &&
            forms.map((form) => (
              <tr
                key={form.form_id}
                className="bg-gray-800 hover:bg-gray-700 cursor-pointer"
                onClick={() => onSelectform(form)}
              >
                <td className="px-4 py-2">{form.form_id}</td>
                <td className="px-4 py-2">{form.form_name}</td>
                <td className="px-4 py-2">{form.form_status}</td>
                <td className="px-4 py-2">{form.form_description}</td>
                <td className="px-4 py-2">
                  {form?.form_date_start
                    ? new Date(form.form_date_start).toISOString().split("T")[0]
                    : ""}
                </td>
                <td className="px-4 py-2">
                  {form?.form_date_finish
                    ? new Date(form.form_date_finish)
                        .toISOString()
                        .split("T")[0]
                    : ""}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableFormMaintenance;
