"use client";
import Header from "@/components/header/header";
import TableInformationTI from "./tableInformationTI";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useUser } from "../../../lib/userContext";
import { User } from "../../index";

const InformationTI: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { user } = useUser();
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [inactiveUsers, setInactiveUsers] = useState<User[]>([]);
  const [showInactive, setShowInactive] = useState(false);

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
    } catch (error) {
      console.error("Error fetching users:", error);
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

  return (
    <div className="background_color">
      <Header />
      <section className="p-14 flex flex-col items-center">
        <button
          className="m-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={() => setShowInactive(!showInactive)}
        >
          {showInactive ? "Mostrar Activos" : "Mostrar Inactivos"}
        </button>
        <div className="w-full mt-10">
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
