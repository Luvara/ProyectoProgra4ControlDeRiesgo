"use client";
import TableCoordinate from "./tableCoordinate";
import Header from "@/components/header/header";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useUser } from "../../../lib/userContext";
import { User } from "../../index";

const Coordinate: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [inactiveUsers, setInactiveUsers] = useState<User[]>([]);
  const [showInactive, setShowInactive] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (typeof window !== "undefined" && !session) {
      router.push("/");
    } else if (user) {
      fetchUsers();
    }
  }, [session, user, router]);

  const fetchUsers = async () => {
    if (!user?.department_dep_id) return;
    try {
      const response = await fetch(`/api/adminCoordinateTI?userTypeId=3`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Fetched users:", data);
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
    const newToRespond = checked ? "y" : "n";

    try {
      const response = await fetch("/api/adminCoordinateTI", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.usu_id,
          state: field === "usu_state" ? newState : user.usu_state
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
      <section className="p-14 flex flex-col items-center ">
        <h2 className="text-white m-10 text-6xl">Coordinadores Internos</h2>

        <button
          className="m-19 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={() => setShowInactive(!showInactive)}
        >
          {showInactive ? "Mostrar Activos" : "Mostrar Inactivos"}
        </button>
        <div className="w-full mt-10">
          <TableCoordinate
            users={showInactive ? inactiveUsers : activeUsers}
            setUsers={showInactive ? setInactiveUsers : setActiveUsers}
            handleStateChange={handleStateChange}
          />
        </div>
      </section>
    </div>
  );
};

export default Coordinate;
