import Image from "next/image";

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplateUserActivate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ firstName }) => (
  <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow-md">
    <img
      className="my-2"
      src="/Logo.svg"
      width={125}
      height={125}
      alt="image"
    />
    <h2 className="text-2xl font-bold mb-4 text-gray-800">
      Notificación de Aceptación
    </h2>
    <h2 className="text-2xl font-bold mb-4 text-gray-800">
      ¡Saludos, {firstName}!
    </h2>
    <p className="text-gray-700 mb-6">
      Esta es una notificación de que fue aceptado. Sea cordialmente bienvenido
      a nuestra empresa.
    </p>
    <p className="text-gray-700">Atentamente,</p>
    <p className="text-gray-700">El equipo de SCI</p>
    <div className="mt-6">
      <a
        href=""
        className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm"
      >
        Visítanos
      </a>
    </div>
  </div>
);
