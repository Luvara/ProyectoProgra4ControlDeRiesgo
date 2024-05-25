"use client";
import Header from "@/components/header/header";
import TableRequest from "./tablerequest"; // Ajusta la ruta según sea necesario
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useUser } from "../../../lib/userContext";
import { User } from "../../index";
import { useRequest } from "../../../lib/requestContext"; // Ajusta la ruta según sea necesario

const Request: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { user } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const { fetchRequestCount } = useRequest(); // Asegúrate de llamar a esta función después de aceptar o rechazar

  useEffect(() => {
    if (typeof window !== "undefined" && !session) {
      router.push("/");
    } else if (user) {
      fetchUsers();
    }
  }, [session, user, router]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`/api/adminTI?checkPermissions=true`);
      const data: User[] = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleStateChange = async (approved: boolean, user: User) => {
    try {
      if (approved) {
        const response = await fetch("/api/adminTI", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.usu_id,
            permissons: "A",
          }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } else {
        const response = await fetch("/api/adminTI", {
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
      fetchUsers(); // Recarga la lista de solicitudes
      fetchRequestCount(); // Actualiza el contador en el encabezado
    } catch (error) {
      console.error("Error updating user state:", error);
    }
  };

  return (
    <div className="background_color">
      <Header />
      <section className="p-14 flex flex-col items-center">
        <div className="w-full mt-10">
          <TableRequest
            users={users}
            setUsers={setUsers}
            handleStateChange={handleStateChange}
          />
        </div>
      </section>
    </div>
  );
};

export default Request;
