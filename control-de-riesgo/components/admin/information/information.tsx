
"use client";

import InformationTable from "./informationTable";
import Header from "@/components/header/header";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Information: React.FC = () => {

  
    const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && !session) {
      router.push("/");
    }
  }, [session, router]);

  
  return (
    <div className="background_color">
      <Header />
      <section className="p-14">
        <InformationTable />
      </section>
    </div>
  );
};

export default Information;