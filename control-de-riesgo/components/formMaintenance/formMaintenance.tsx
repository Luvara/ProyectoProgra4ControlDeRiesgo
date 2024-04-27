"use client";
import Header from "../header/header";
import BodyFormMaintenance from "./bodyFormMaintenance";

const FormMaintenance: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-black to-purple-950">
      <Header />
      <section className="p-14">
        <BodyFormMaintenance />
      </section>
    </div>
  );
};

export default FormMaintenance;
