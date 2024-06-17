"use client";
import Header from "@/components/header/header";
import TableInformationBoss from "./tableEmployee";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useUser } from "../../../lib/userContext";
import { User, Department } from "../../index";
import Card from "../../card";
import MantFormSkeleton from "../../skeleton/mantFormSkeleton";
import TablesSkeleton from "../../skeleton/tablesSkeleton";
import ScrollToTopButton from "../../util/buttonToTop";

const InformationBoss: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { user } = useUser();
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [inactiveUsers, setInactiveUsers] = useState<User[]>([]);
  const [showInactive, setShowInactive] = useState(false);
  const [activeDepartment, setActiveDepartment] = useState(0); // Seleccionar "Ambiente" por defecto
  const [data, setData] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && !session) {
      router.push("/");
    } else if (user) {
      fetchDepartments();
    }
  }, [session, user, router]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      fetchUsers(data[activeDepartment]?.dep_id);
    }
  }, [data, activeDepartment]);

  const fetchDepartments = async () => {
    try {
      const res = await fetch("/api/departments");
      const data = await res.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching departments:", error);
    }
  };

  const handleSectionChange = (index: number) => {
    setActiveDepartment(index);
    fetchUsers(data[index]?.dep_id);
  };

  const fetchUsers = async (departmentId: number) => {
    try {
      const response = await fetch(`/api/users?departmentId=${departmentId}`);
      const data: User[] = await response.json();
      const active = data.filter((u: User) => u.usu_state === "A");
      const inactive = data.filter((u: User) => u.usu_state === "I");
      setActiveUsers(active);
      setInactiveUsers(inactive);
      setLoadingUsers(false);
    } catch (error) {
      setLoadingUsers(false);
      console.error("Error fetching users:", error);
    }
  };

  const handleStateChange = async (
    checked: boolean,
    user: User,
    field: "usu_state" | "usu_torespond"
  ) => {
    const newState = checked ? "A" : "I";
    const newToRespond = checked ? "y" : "n";

    try {
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.usu_id,
          state: field === "usu_state" ? newState : user.usu_state,
          toRespond:
            field === "usu_torespond" ? newToRespond : user.usu_torespond,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Update the user state locally
      if (field === "usu_state") {
        if (newState === "A") {
          setInactiveUsers((prev) =>
            prev.filter((u) => u.usu_id !== user.usu_id)
          );
          setActiveUsers((prev) => [...prev, { ...user, usu_state: newState }]);
        } else {
          setActiveUsers((prev) =>
            prev.filter((u) => u.usu_id !== user.usu_id)
          );
          setInactiveUsers((prev) => [
            ...prev,
            { ...user, usu_state: newState },
          ]);
        }
      } else {
        setActiveUsers((prev) =>
          prev.map((u) =>
            u.usu_id === user.usu_id ? { ...u, usu_torespond: newToRespond } : u
          )
        );
        setInactiveUsers((prev) =>
          prev.map((u) =>
            u.usu_id === user.usu_id ? { ...u, usu_torespond: newToRespond } : u
          )
        );
      }
    } catch (error) {
      console.error("Error updating user state:", error);
    }
  };

  const svgs = [
    "/Ambience.svg",
    "/Risk.svg",
    "/Control.svg",
    "/Systems.svg",
    "/Follow-up.svg",
  ];

  if (loading) {
    return (
      <div>
        <Header />
        <div className="p-14">
          <MantFormSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <Header />
      <section className="p-14 flex flex-col items-center">
        <h1 className="text-3xl font-bold m-4 text-white">Jefes de Area</h1>
        <h2 className="text-2xl font-bold m-4 text-white">
          Seleccione un eje:
        </h2>
        <div className="flex w-full items-center space-x-4 justify-items-stretch px-5 ">
          {data.map((department, index) => (
            <Card
              key={department.dep_id}
              svg={svgs[index]}
              title={department.dep_name}
              onClick={() => {
                setLoadingUsers(true);
                handleSectionChange(index);
              }}
              isActive={activeDepartment === index}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold text-white mt-8">
          Mostrar Jefes por estado:
        </h2>
        <button
          className="flex p-2 border rounded-xl text-white w-52 h-12 font-bold justify-center items-center btn-form hover:bg-slate-600 mt-6"
          onClick={() => setShowInactive(!showInactive)}
        >
          {showInactive ? "Mostrar Activos" : "Mostrar Inactivos"}
        </button>
        <div className="w-full ">
          {loadingUsers ? (
            <TablesSkeleton />
          ) : (
            <TableInformationBoss
              users={showInactive ? inactiveUsers : activeUsers}
              setUsers={showInactive ? setInactiveUsers : setActiveUsers}
              handleStateChange={handleStateChange}
            />
          )}
        </div>
      </section>
      <ScrollToTopButton />
    </div>
  );
};

export default InformationBoss;
