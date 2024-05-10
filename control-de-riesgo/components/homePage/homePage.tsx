"use client";
import { useEffect } from "react";
import Header from "../header/header";
import BodyHomePage from "./bodyHomePage";
import { useSession} from "next-auth/react"
import { useRouter } from 'next/navigation';
const HomePage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter(); 
  if (!session) {
    useEffect(() => {
      router.replace('/'); // Usar 'replace' para evitar que el usuario vuelva a la página actual después del login
    }, [router]);
  
  }
  return (
    <div className="bg-gradient-to-b from-black to-purple-950">
      <Header />
      <section className="p-14">
        <BodyHomePage />
      </section>
    </div>
  );
};

export default HomePage;
