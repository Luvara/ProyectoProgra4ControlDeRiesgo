import React from "react";
import Image from "next/image";

const registerSkeleton: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen p-10 animate-pulse">
      <div className="flex flex-col w-full  items-center justify-center p-4 bg-background-2 rounded-xl text-white bg-register sm:w-3/4 lg:w-2/5">
        <Image
          className="my-2"
          src="/Logo.svg"
          width={125}
          height={125}
          alt="image"
        />
        <div className="text-3xl font-bold text-transparent mb-6 bg-slate-400 opacity-40 rounded-lg">
          Formulario Registro
        </div>
        <form className="w-full max-w-sm">
          <div className="space-y-5">
            {/* campo cedula */}
            <div className="inputContainer">
              <div className="inputTxt" />
            </div>
            {/* campo nombre */}
            <div className="inputContainer">
              <div className="inputTxt" />
            </div>
            {/* campo primer apellido */}
            <div className="inputContainer">
              <div className="inputTxt" />
            </div>
            {/* campo segundo apellido */}
            <div className="inputContainer">
              <div className="inputTxt" />
            </div>
            {/* campo correo */}
            <div>
              <div className="inputContainer">
                <div className="inputTxt" />
              </div>
            </div>

            <div className="inputContainer">
              <div className="inputTxt" />
            </div>
          </div>

          <div className="flex justify-end">
            <div className="flex p-2 border rounded-xl text-transparent w-52 mt-5 font-bold justify-center hover:bg-slate-600">
              Enviar
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default registerSkeleton;
