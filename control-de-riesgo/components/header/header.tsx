"use client";
import { useState, useEffect } from "react";

import { signOut, useSession } from "next-auth/react";
import { User } from "../../components/index";
import Image from "next/image";
import HeaderButtonMobile from "./headerButtonMobile";
import HeaderButton from "./headerButton";
import Link from "next/link";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownMobile, setIsDropdownMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: false }); // Evita la redirección automática de NextAuth
    window.location.href =
      "https://login.microsoftonline.com/{AZURE_AD_TENANT_ID}/oauth2/v2.0/logout?post_logout_redirect_uri=" +
      encodeURIComponent(window.location.origin);
  };
  // const [user, setUser] = useState<User | null>(UserLog());
  // Permitir `null`

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="relative ">
      {/*<div className="max-w-screen-xl flex flex-wrap  justify-center items-center text-white marker:p-4 lg:justify-between   md:flex-row md:justify-center ">*/}
      <div className="max-w-screen-xl flex flex-wrap justify-between items-center mx-10 p-4 md:mx-auto text-white md:justify-center  lg:justify-between">
        <div className="flex flex-col items-center">
          <Image src="/Logo.svg" width={50} height={50} alt="image" />
          <p>Control de Riesgo</p>
          <div className="flex space-x-2">
            <p className="text-nowrap">Usuario:</p>
            <p>{<p>{session?.user?.name}</p>}</p>
          </div>
        </div>

        <HeaderButtonMobile
          onClick={() => setIsDropdownMobile(!isDropdownMobile)}
          ariaExpanded={isDropdownMobile}
        >
          Menu principal
        </HeaderButtonMobile>

        <div
          className={`${
            isDropdownMobile ? "block" : "hidden"
          } mx-14 absolute top-full left-0 right-0 md:static md:block md:w-auto z-20`}
        >
          <ul
            className={`${
              isMobile ? "space-y-2 bg-nodes " : ""
            } flex flex-col p-4 md:flex-row md:space-x-8 items-center`}
          >
            <li>
              <Link href="/homePage" className="">
                <img
                  className="img-hover"
                  src="https://img.icons8.com/sf-regular-filled/50/ffffff/home.png"
                  alt="home"
                />
              </Link>
            </li>

            <li className="relative">
              <HeaderButton onClick={toggleDropdown}>
                Mantenimiento
              </HeaderButton>

              {isDropdownOpen && (
                <div className="absolute w-60 bg-nodes mt-2">
                  <ul className="py-1 text-sm">
                    <li>
                      <Link
                        className="block px-4 py-2 img-hover"
                        href="/admin/formMaintenance"
                      >
                        {" "}
                        Mantenimiento de formularios
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="block px-4 py-2 img-hover"
                        href="/admin/userMaintenance"
                      >
                        {" "}
                        Mantenimiento de usuarios
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li>
              <Link href="/form" className="img-hover">
                {" "}
                Completar formulario
              </Link>
            </li>
            <li>
              <button onClick={handleSignOut} className="img-hover-red">
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
