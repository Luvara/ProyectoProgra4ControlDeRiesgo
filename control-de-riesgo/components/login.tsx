"use client";
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Login: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && session) {
      router.push("/homePage");
    }
  }, [session, router]);

  if (session) return null;

  return (
    <>
      <div className="flex h-screen items-center justify-center tracking-wider">
        <div className="flex flex-col items-center justify-center p-8 logBox">
          <div className="flex flex-col items-center z-10">
            <Image src="/Logo.svg" width={150} height={150} alt="Image"></Image>
            <p className="text-lg text-white text-center font-bold mt-10">
              ¡Bienvenido de vuelta!
            </p>
            <p className="text-lg text-white text-center">
              Inicia sesión para comenzar.
            </p>
            <button
              className="px-8 py-3 mt-10 text-white flex items-center justify-center font-bold tracking-wider
              bg-purple-950 rounded-lg hover:bg-purple-900 active:bg-blue-800 transition delay-50 hover:shadow-md hover:shadow-purple-400"
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              <img
                className="mr-2"
                width="40"
                height="40"
                src="https://img.icons8.com/fluency/48/azure-1.png"
                alt="azure-1"
              />
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
