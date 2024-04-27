"use client";
import Header from "../header/header";
import BodyForm from "./bodyForm";

const HomePage: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-black to-purple-950">
      <Header />
      <section className="p-14">
        <BodyForm />
      </section>
    </div>
  );
};

export default HomePage;
