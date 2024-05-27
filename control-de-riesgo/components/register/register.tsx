"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import RegisterSkeleton from "../skeleton/registerSkeleton";

const Register = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    cedula: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    correo: "",
    rol: "",
  });

  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para rastrear el envío

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "correo") {
      if (value === "") {
        setEmailError(null);
      } else {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@est\.una\.ac\.cr$/;
        if (!emailRegex.test(value)) {
          setEmailError("El correo debe terminar en @est.una.ac.cr");
        } else {
          setEmailError(null);
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailError) {
      return; // No enviar el formulario si hay un error de email
    }

    setIsSubmitting(true); // Establecer el estado de envío a true

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("User registered successfully:", result);
        router.push("/"); // Redirige al usuario al login después de registrarse
      } else {
        console.error("Failed to register user");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setIsSubmitting(false); // Restablecer el estado de envío a false
    }
  };

  if (isSubmitting) {
    return <RegisterSkeleton />; // Mostrar el esqueleto mientras se envía el formulario
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen p-10">
      <div className="flex flex-col w-full  items-center justify-center p-4 bg-background-2 rounded-xl text-white bg-register sm:w-3/4 lg:w-2/5">
        <Image
          className="my-2"
          src="/Logo.svg"
          width={125}
          height={125}
          alt="image"
        />
        <h1 className="text-3xl font-bold mb-6">Formulario Registro</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="space-y-5">
            {/* campo cedula */}
            <div className="inputContainer">
              <input
                id="cedula"
                name="cedula"
                type="text"
                value={formData.cedula}
                onChange={handleChange}
                className="inputTxt"
                placeholder="a"
                required
              />
              <label className="labelFloat" htmlFor="cedula">
                Cédula
              </label>
            </div>
            {/* campo nombre */}
            <div className="inputContainer">
              <input
                id="nombre"
                name="nombre"
                type="text"
                value={formData.nombre}
                onChange={handleChange}
                className="inputTxt"
                placeholder="a"
                required
              />
              <label className="labelFloat" htmlFor="nombre">
                Nombre
              </label>
            </div>
            {/* campo primer apellido */}
            <div className="inputContainer">
              <input
                id="apellido1"
                name="apellido1"
                type="text"
                value={formData.apellido1}
                onChange={handleChange}
                className="inputTxt"
                placeholder="a"
                required
              />
              <label className="labelFloat" htmlFor="apellido1">
                Primer Apellido
              </label>
            </div>
            {/* campo segundo apellido */}
            <div className="inputContainer">
              <input
                id="apellido2"
                name="apellido2"
                type="text"
                value={formData.apellido2}
                onChange={handleChange}
                className="inputTxt"
                placeholder="a"
                required
              />
              <label className="labelFloat" htmlFor="apellido2">
                Segundo Apellido
              </label>
            </div>
            {/* campo correo */}
            <div>
              <div className="inputContainer">
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  value={formData.correo}
                  onChange={handleChange}
                  className="inputTxt"
                  placeholder="a"
                  required
                />
                <label className="labelFloat" htmlFor="correo">
                  Correo
                </label>
              </div>
              {/* error correo */}
              {emailError && (
                <p className="text-red-500 text-sm italic ms-4 mt-1">
                  {emailError}
                </p>
              )}
            </div>

            <div className="inputContainer">
              <select
                id="rol"
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                className="inputTxt"
                required
              >
                <option className="bg-background-2" value="">
                  Seleccione el puesto
                </option>
                <option className="bg-background-2" value="TI">
                  TI
                </option>
                <option className="bg-background-2" value="Coordinador interno">
                  Coordinador interno
                </option>
                <option className="bg-background-2" value="Empleado de area">
                  Empleado de área
                </option>
                <option className="bg-background-2" value="Jefe de area">
                  Jefe de área
                </option>
              </select>
              <label className="labelFloat" htmlFor="rol">
                Puesto
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex p-2 border rounded-xl text-white w-52 mt-5 font-bold justify-center hover:bg-slate-600"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
