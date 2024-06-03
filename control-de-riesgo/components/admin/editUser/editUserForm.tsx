"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User, Department } from "../../index";
import Header from "@/components/header/header";
import { useSession } from "next-auth/react";
import RegisterSkeleton from "../../skeleton/registerSkeleton";

const EditUserForm: React.FC<{ usu_id: string }> = ({ usu_id }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching departments:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => (prevUser ? { ...prevUser, [name]: value } : null));
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
          if (user.userType_usut_id == 4) {
            router.push("/admin/adminControlnterno/informationBoss");
          } else {
            router.push("/admin/adminControlnterno/informationEmployee");
          }
        } else {
          console.error("Error updating user details");
        }
      } catch (error) {
        console.error("Error updating user details", error);
      }
    }
  };

  if (isLoading) {
    return <RegisterSkeleton />;
  }

  return (
    <div className="h-full">
      <Header />
      <div className="flex items-center justify-center p-10">
        <div className="flex flex-col w-full items-center justify-center p-4 bg-background-2 rounded-xl text-white bg-register sm:w-3/4 lg:w-2/5">
          <h1 className="text-3xl font-bold mb-6">Editar datos de usuario</h1>
          {user && (
            <form onSubmit={handleSubmit} className="w-full max-w-lg">
              <div className="space-y-5">
                {/* campo cedula */}
                <div className="inputContainer">
                  <input
                    id="cedula"
                    name="cedula"
                    type="text"
                    value={user.usu_idnumber}
                    onChange={handleInputChange}
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
                    value={user.usu_name}
                    onChange={handleInputChange}
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
                    value={user.usu_lastname}
                    onChange={handleInputChange}
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
                    value={user.usu_slastname}
                    onChange={handleInputChange}
                    className="inputTxt"
                    placeholder="a"
                    required
                  />
                  <label className="labelFloat" htmlFor="apellido2">
                    Segundo Apellido
                  </label>
                </div>
                {/* campo correo */}
                <div className="inputContainer">
                  <input
                    id="correo"
                    name="correo"
                    type="email"
                    value={user.usu_email}
                    onChange={handleInputChange}
                    className="inputTxt"
                    placeholder="a"
                    required
                  />
                  <label className="labelFloat" htmlFor="correo">
                    Correo
                  </label>
                </div>
                {/* campo departamento */}
                <div className="inputContainer">
                  <select
                    id="department"
                    name="department"
                    value={selectedDepartment || ""}
                    onChange={handleDepartmentChange}
                    className="inputTxt"
                  >
                    {departments.map((dept) => (
                      <option
                        className="bg-background-2"
                        key={dept.dep_id}
                        value={dept.dep_id}
                      >
                        {dept.dep_name}
                      </option>
                    ))}
                  </select>
                  <label className="labelFloat" htmlFor="department">
                    Departamento
                  </label>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex p-2 border rounded-xl text-white w-52 mt-5 font-bold justify-center hover:bg-slate-600"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUserForm;
