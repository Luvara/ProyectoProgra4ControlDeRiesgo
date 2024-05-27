"use client";
import Header from "../header/header";
import BodyFormMaintenance from "./bodyFormMaintenance";
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const FormMaintenance: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && !session) {
      router.push("/");
    }
  }, [session, router]);
  return (
    <div>
      <Header />
      <section className="px-14">
        <BodyFormMaintenance />
      </section>
    </div>
  );
};

export default FormMaintenance;
