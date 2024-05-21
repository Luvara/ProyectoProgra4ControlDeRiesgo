"use client";
import Header from "../header/header";
import BodyForm from "./bodyForm";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Form: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && !session) {
      router.push("/");
    }
  }, [session, router]);
    return (
      <div className="bg-gradient-to-b from-black to-purple-950">
        <Header />
        <section className="p-14">
          <BodyForm />
        </section>
      </div>
    );
  }


export default Form;
