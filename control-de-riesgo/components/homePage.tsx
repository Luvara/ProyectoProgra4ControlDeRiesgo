"use client";
import Header from "./header";
import BodyHomePage from "./bodyHomePage";

const HomePage: React.FC = () => {
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
