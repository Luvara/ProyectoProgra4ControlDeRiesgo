"use client";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import React, { Suspense } from "react";

const Error_page = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const router = useRouter();

  const handleBackToLogin = async () => {
    router.push("/"); // Redirect to login manually
  };

  const handleRegister = async () => {
    router.push("/register"); // Redirect to registration page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Image
        className="animate-bounce"
        src="/error.svg"
        width={300}
        height={300}
        alt="Image"
      />
      <div className="my-4 flex flex-col items-center md:justify-between text-white bg-background-3 shadow-lg rounded-lg p-5">
        <h1 className="text-[3rem]">Error</h1>
        <p className="text-[2rem]">{error ? error : "Something is wrong!!"}</p>
        <p className="text-[2rem]">Please contact administration!</p>
        {!error && ( // The button will only be displayed if 'error' has no value
          <>
            <button
              onClick={handleBackToLogin}
              className="px-6 py-2 text-white bg-purple-800 rounded hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 mt-4"
            >
              Back to login
            </button>
          </>
        )}
        <button
          onClick={handleRegister}
          className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
        >
          Register
        </button>
      </div>
    </div>
  );
};

const ErrorPageWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Error_page />
  </Suspense>
);

export default ErrorPageWrapper;
