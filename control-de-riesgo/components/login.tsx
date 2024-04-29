"use client";
import { useSession,signOut,signIn } from "next-auth/react";


const Login: React.FC = () => {
  const {data:session}=useSession();
  

  if(session){
    return(
      <div  className="flex h-screen items-center justify-center">
      <div
        className="flex flex-col items-center justify-center w-80 h-80 rounded-lg shadow-lg p-5"
        style={{ backgroundColor: "#30363D" }}
      >
        <img src="#" alt="Empresa Logo" className="mb-8 max-w-full h-auto" />
        <h2>Signed in as:{session.user?.name}</h2>
        <h3>Email: {session.user?.email}</h3>
        <button
          className="px-6 py-2 text-white bg-purple-800 rounded hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          onClick={(e) => {
            e.preventDefault()
            signOut()
          }}
        >
          Logout with Azure
        </button>
      </div>
    </div>
    );
  }

  return (
    <>
      <div  className="flex h-screen items-center justify-center">
        <div
          className="flex flex-col items-center justify-center w-80 h-80 rounded-lg shadow-lg p-5"
          style={{ backgroundColor: "#30363D" }}
        >
          <img src="#" alt="Empresa Logo" className="mb-8 max-w-full h-auto" />
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
