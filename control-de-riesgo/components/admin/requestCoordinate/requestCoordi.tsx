"use client";
import Header from "@/components/header/header";
import TableRequest from "./tablerequest";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useUser } from "../../../lib/userContext";
import { User, Department } from "../../index";
import { useRequest } from "../../../lib/requestContext";
import TablesSkeleton from "../../skeleton/tablesSkeleton";
import ScrollToTopButton from "../../util/buttonToTop";

const RequestC: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { user } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const { fetchCoordinatorRequestCount } = useRequest();
  const [loading, setLoading] = useState(true);

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
      const response = await fetch(
        `/api/adminCoordinator?checkPermissions=true`
      );
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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching departments:", error);
      setLoading(false);
    }
  };

  const handleStateChange = async (
    approved: boolean,
    user: User,
    departmentId?: number
  ) => {
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
        <h1 className="text-3xl font-bold m-4 text-white">
          Solicitudes pendientes
        </h1>

        <div className="w-full ">
          {loading ? (
            <TablesSkeleton />
          ) : (
            <TableRequest
              users={users}
              setUsers={setUsers}
              handleStateChange={handleStateChange}
              departments={departments}
            />
          )}
        </div>
      </section>
      <ScrollToTopButton />
    </div>
  );
};

export default RequestC;
