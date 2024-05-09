"use client";
import { useEffect } from 'react';
import { useSession, signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Image from "next/image";


const Login: React.FC = () => {
  const {data:session}=useSession();
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && session) {
      router.push('/homePage');
    }
  }, [session, router]);

  if (session) return null;

  return (
    <>
      <div  className="flex h-screen items-center justify-center">
        <div
          className="flex flex-col items-center justify-center w-80 h-80 rounded-lg shadow-lg p-5"
          style={{ backgroundColor: "#30363D" }}
        >
          <Image src="/Logo.svg" width={150} height={150} alt="Image"></Image>
          <button
            className="px-6 py-2 text-white bg-purple-800 rounded hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            onClick={(e) => {
              e.preventDefault()
              signIn()}
            }
          >
            Login with Azure
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
