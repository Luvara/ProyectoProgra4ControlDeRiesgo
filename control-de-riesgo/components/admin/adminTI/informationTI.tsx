"use client";
import Header from "@/components/header/header";
import TableInformationTI from "./tableInformationTI";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useUser } from "../../../lib/userContext";
import { User } from "../../index";
import MantFormSkeleton from "../../skeleton/mantFormSkeleton";

const InformationTI: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { user } = useUser();
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [inactiveUsers, setInactiveUsers] = useState<User[]>([]);
  const [showInactive, setShowInactive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && !session) {
      router.push("/");
    } else if (user) {
      fetchUsers();
    }
  }, [session, user, router]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`/api/adminTI?userTypeId=2`);
      const data: User[] = await response.json();
      const active = data.filter((u: User) => u.usu_state === "A");
      const inactive = data.filter((u: User) => u.usu_state === "I");
      setActiveUsers(active);
      setInactiveUsers(inactive);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleStateChange = async (
    checked: boolean,
    user: User,
    field: "usu_state"
  ) => {
    const newState = checked ? "A" : "I";
    try {
      const response = await fetch("/api/adminTI", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.usu_id,
          state: field === "usu_state" ? newState : user.usu_state,
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
      }
    } catch (error) {
      console.error("Error updating user state:", error);
    }
  };

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
        <h1 className="text-3xl font-bold m-4 text-white">
          Administradores de TI
        </h1>
        <h2 className="text-2xl font-bold text-white mt-8">
          Mostrar administradores por estado:
        </h2>

        <button
          className="flex p-2 border rounded-xl text-white w-52 h-12 font-bold justify-center items-center btn-form hover:bg-slate-600 mt-6"
          onClick={() => setShowInactive(!showInactive)}
        >
          {showInactive ? "Mostrar Activos" : "Mostrar Inactivos"}
        </button>
        <div className="w-full">
          <TableInformationTI
            users={showInactive ? inactiveUsers : activeUsers}
            setUsers={showInactive ? setInactiveUsers : setActiveUsers}
            handleStateChange={handleStateChange}
          />
        </div>
      </section>
    </div>
  );
};

export default InformationTI;
