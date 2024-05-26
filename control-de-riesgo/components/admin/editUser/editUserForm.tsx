"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User, Department } from '../../index';
import Header from '@/components/header/header';
import { useSession } from "next-auth/react";


const EditUserForm: React.FC<{ usu_id: string }> = ({ usu_id }) => {
  const { data: session,status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null);

  useEffect(() => {
    if (status === "unauthenticated" && !session) {
      router.push("/");
    } else if (status === "authenticated" && usu_id) {
      fetchUserDetails(usu_id);
      fetchDepartments();
    }
  }, [status, usu_id]);

  const fetchUserDetails = async (usu_id: string) => {
    try {
      const res = await fetch(`/api/adminCoordinateBoss/${usu_id}`);
      const data = await res.json();
      setUser(data);
      setSelectedDepartment(data.department_dep_id);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await fetch(`/api/departments`);
      const data = await res.json();
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => prevUser ? { ...prevUser, [name]: value } : null);
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedDepartment(Number(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      try {
        const res = await fetch(`/api/adminCoordinateBoss/${usu_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...user,
            department_dep_id: selectedDepartment,
          }),
        });

        if (res.ok) {
          router.push("/admin/adminControlnterno/informationBoss"); // Redireccionar después de la actualización exitosa
        } else {
          console.error("Error updating user details");
        }
      } catch (error) {
        console.error("Error updating user details", error);
      }
    }
  };

  return (
    <div className="background_color">
      <Header />
      <section className="p-14 flex flex-col items-center">
        <h2 className="text-white m-10 text-6xl">Editar Usuario</h2>
        {user && (
          <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="usu_idnumber">
                Cédula
              </label>
              <input
                type="text"
                id="usu_idnumber"
                name="usu_idnumber"
                value={user.usu_idnumber}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="usu_name">
                Nombre
              </label>
              <input
                type="text"
                id="usu_name"
                name="usu_name"
                value={user.usu_name}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="usu_lastname">
                Apellido
              </label>
              <input
                type="text"
                id="usu_lastname"
                name="usu_lastname"
                value={user.usu_lastname}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="usu_slastname">
                Segundo Apellido
              </label>
              <input
                type="text"
                id="usu_slastname"
                name="usu_slastname"
                value={user.usu_slastname}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="usu_email">
                Correo
              </label>
              <input
                type="text"
                id="usu_email"
                name="usu_email"
                value={user.usu_email}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="department">
                Departamento
              </label>
              <select
                id="department"
                name="department"
                value={selectedDepartment || ""}
                onChange={handleDepartmentChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {departments.map((dept) => (
                  <option key={dept.dep_id} value={dept.dep_id}>
                    {dept.dep_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Guardar
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};

export default EditUserForm;
