"use client";
import Header from "../header/header";
import BodyUserMaintenance from "./bodyUserMaintenance";


const UserMaintenance: React.FC = () => {

    return (
      <div className="bg-gradient-to-b from-black to-purple-950">
        <Header />
        <section className="p-14">
          <BodyUserMaintenance />
        </section>
      </div>
    );
  }


export default UserMaintenance;
