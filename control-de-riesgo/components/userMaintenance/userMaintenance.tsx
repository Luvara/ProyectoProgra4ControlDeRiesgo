"use client";
import Header from "../header/header";
import BodyUserMaintenance from "./bodyUserMaintenance";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserMaintenance: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) {
    useEffect(() => {
      router.replace("/"); // Usar 'replace' para evitar que el usuario vuelva a la página actual después del login
    }, [router]);
    return (
      <div className="bg-gradient-to-b from-black to-purple-950">
        <Header />
        <section className="p-14">
          <BodyUserMaintenance />
        </section>
      </div>
    );
  }
};

export default UserMaintenance;
