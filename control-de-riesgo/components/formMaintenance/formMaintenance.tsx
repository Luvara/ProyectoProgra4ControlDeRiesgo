"use client";
import Header from "../header/header";
import BodyFormMaintenance from "./bodyFormMaintenance";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const FormMaintenance: React.FC = () => {
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
          <BodyFormMaintenance />
        </section>
      </div>
    );
  }
};
export default FormMaintenance;
