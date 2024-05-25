import Login from "@/components/login";
import React, { Suspense } from "react";
import ErrorBoundary from "@/components/lib/errorBoundary";

function Page() {
  return (
    <main
      id="root"
      className="flex flex-col items-center justify-center min-h-screen py-2"
    >
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}

export default Page;
