"use client";
import Header from "@/components/header/header";
import TableRequest from "./tablerequest"; // Ajusta la ruta según sea necesario
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useUser } from "../../../lib/userContext";
import { User } from "../../index";
import { useRequest } from "../../../lib/requestContext"; // Ajusta la ruta según sea necesario
import TablesSkeleton from "../../skeleton/tablesSkeleton";
import ScrollToTopButton from "../../util/buttonToTop";

const Request: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { user } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const { fetchTIRequestCount, fetchCoordinatorRequestCount } = useRequest(); // Asegúrate de llamar a esta función después de aceptar o rechazar
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
      const response = await fetch(`/api/adminRequest?checkPermissions=true`);
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching users:", error);
    }
  };

  const handleStateChange = async (approved: boolean, user: User) => {
    try {
      if (approved) {
        const response = await fetch("/api/adminRequest", {
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
        
        try {
          const response = await fetch(`/api/sendEmailActivateUser`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usu_id: user.usu_id }),
          });
          if (!response.ok) throw new Error("Failed to send email notification");
        } catch (error) {
          console.error("Error sending email notification:", error);
        }

      } else {

        try {
          const response = await fetch(`/api/sendEmailRejectUser`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usu_id: user.usu_id }),
          });
          if (!response.ok) throw new Error("Failed to send email notification");
        } catch (error) {
          console.error("Error sending email notification:", error);
        }

        const response = await fetch("/api/adminRequest", {
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
      fetchTIRequestCount();
    } catch (error) {
      console.error("Error updating user state:", error);
    }
  };

  return (
    <div className="background_color">
      <Header />
      <section className="p-14 flex flex-col items-center">
        <h2 className="text-white m-10 text-6xl">Solicitudes pendientes</h2>

        <div className="w-full">
        {loading ? (
            <TablesSkeleton />
          ) : (
          <TableRequest
            users={users}
            setUsers={setUsers}
            handleStateChange={handleStateChange}
          />
        )}
        </div>
      </section>
      <ScrollToTopButton />
    </div>
  );
};

export default Request;
