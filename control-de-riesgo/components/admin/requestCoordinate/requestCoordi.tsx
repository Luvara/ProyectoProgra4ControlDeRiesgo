"use client";
import Header from "@/components/header/header";
import TableRequest from "./tablerequest"; 
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useUser } from "../../../lib/userContext";
import { User, Department } from "../../index";
import { useRequest } from "../../../lib/requestContext"; 

const RequestC: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { user } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const { fetchCoordinatorRequestCount } = useRequest(); 

  useEffect(() => {
    if (typeof window !== "undefined" && !session) {
      router.push("/");
    } else if (user) {
      fetchUsers();
      fetchDepartments();
    }
  }, [session, user, router]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`/api/adminCoordinator?checkPermissions=true`);
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await fetch(`/api/departments`);
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleStateChange = async (approved: boolean, user: User, departmentId?: number) => {
    try {
      if (approved) {
        const response = await fetch("/api/adminRequestCoordi", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.usu_id,
            permissons: "A",
            department_dep_id: departmentId,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } else {
        const response = await fetch("/api/adminRequestCoordi", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.usu_id,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      }

      fetchUsers(); 
      fetchCoordinatorRequestCount(); 
    } catch (error) {
      console.error("Error updating user state:", error);
    }
  };

  return (
    <div className="background_color">
      <Header />
      <section className="p-14 flex flex-col items-center">
        <h2 className="text-white m-10 text-6xl">Solicitudes pendientes</h2>

        <div className="w-full mt-10">
          <TableRequest
            users={users}
            setUsers={setUsers}
            handleStateChange={handleStateChange}
            departments={departments}
          />
        </div>
      </section>
    </div>
  );
};

export default RequestC;
