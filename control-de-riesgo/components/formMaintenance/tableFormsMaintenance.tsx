import { Form } from "../index";

const TableFormMaintenance = ({
  forms,
  onSelectform,
}: {
  forms: Form[];
  onSelectform: (form: Form) => void;
}) => {
  const getStatusText = (status: string) => {
    switch (status) {
      case "a":
        return "Activo";
      case "c":
        return "Completo";
      case "d":
        return "Desactivado";
      default:
        return status;
    }
  };

  return (
    <div className="flex w-full">
      <table className="w-full text-white bg-register">
        <thead>
          <tr className="bg-gray-700 border-b">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2 ">Estado</th>
            <th className="px-4 py-2 hidden 2xl:table-cell">Descripción</th>
            <th className="px-4 py-2 hidden  md:table-cell ">Fecha Inicio</th>
            <th className="px-4 py-2 hidden md:table-cell">Fecha Fin</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {forms &&
            forms.map((form) => (
              <tr
                key={form.form_id}
                className="bg-gray-800 hover:bg-gray-600 cursor-pointer"
                onClick={() => onSelectform(form)}
              >
                <td className="px-4 py-2">{form.form_id}</td>
                <td className="px-4 py-2">{form.form_name}</td>
                <td className="px-4 py-2">{getStatusText(form.form_status)}</td>
                <td className="px-4 py-2 hidden 2xl:table-cell">
                  {form.form_description}
                </td>
                <td className="px-4 py-2 hidden md:table-cell">
                  {form?.form_date_start
                    ? new Date(form.form_date_start).toISOString().split("T")[0]
                    : ""}
                </td>

                <td className="px-4 py-2 hidden md:table-cell">
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
