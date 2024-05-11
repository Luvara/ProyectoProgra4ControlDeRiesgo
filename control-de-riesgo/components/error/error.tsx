"use client";
import Image from "next/image";
import { useSearchParams,useRouter } from "next/navigation";

const Error_page = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const router = useRouter();

  const handleBackToLogin = async () => {
    
    router.push('/');  // Redirige al usuario al login manualmente
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Image className="animate-bounce" src="/error.svg" width={300} height={300} alt="Image"></Image>
      <div className="my-4 flex flex-col items-center md:justify-between text-white bg-background-3 shadow-lg rounded-lg p-5">
        <h1 className="text-[3rem]">Error</h1>
        <p className="text-[2rem]">{error ? error : "Somthing is wrong!!"}</p>
        <p className="text-[2rem]">Please contact administration!</p>
        {!error && ( // El botón solo se mostrará si 'error' no tiene un valor
        <button onClick={handleBackToLogin} className="px-6 py-2 text-white bg-purple-800 rounded hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
          Back to login
        </button>
      )}
      </div>
    </div>
  );
};

export default Error_page;
