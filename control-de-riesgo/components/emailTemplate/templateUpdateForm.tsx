interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplateFormUpdate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ firstName }) => (
  <div className="max-w-lg mx-auto bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-lg shadow-xl text-white">
    <h1 className="text-3xl font-extrabold mb-4">¡Bienvenido, {firstName}!</h1>
    <p className="text-lg">
      🚀 Esta es una notificación de que la actualización del formulario está próxima. ¡No te la pierdas!
    </p>
    
  </div>
);
