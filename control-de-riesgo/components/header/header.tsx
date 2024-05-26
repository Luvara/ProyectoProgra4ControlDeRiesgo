"use client";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useUser } from "../../lib/userContext";
import { useRequest } from "../../lib/requestContext";
import Image from "next/image";
import HeaderButtonMobile from "./headerButtonMobile";
import HeaderButton from "./headerButton";
import Link from "next/link";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownMobile, setIsDropdownMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { data: session } = useSession();
  const { user } = useUser();
  const { requestCount, fetchRequestCount } = useRequest();

  const handleSignOut = async () => {
    await signOut({ redirect: false }); // Evita la redirección automática de NextAuth
    window.location.href =
      "https://login.microsoftonline.com/{AZURE_AD_TENANT_ID}/oauth2/v2.0/logout?post_logout_redirect_uri=" +
      encodeURIComponent(window.location.origin);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (user) {
      fetchRequestCount();
    }
  }, [user, fetchRequestCount]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="relative">
      <div className="max-w-screen-xl flex flex-wrap justify-between items-center mx-10 p-4 md:mx-auto text-white md:justify-center  lg:justify-between">
        <div className="flex flex-col items-center">
          <Image src="/Logo.svg" width={50} height={50} alt="image" />
          <p>Control de Riesgo</p>
          <div className="flex space-x-2">
            <p className="text-nowrap">Usuario:</p>
            <p>{session?.user?.name}</p>
            <p>{user?.usertype?.usut_role}</p>
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
              {user?.userType_usut_id !== 5 && (
                <>
                  <HeaderButton onClick={toggleDropdown}>
                    Mantenimiento
                  </HeaderButton>

                  {isDropdownOpen && (
                    <div className="absolute w-60 bg-nodes mt-2">
                      <ul className="py-1 text-sm">
                        {user?.userType_usut_id === 4 ? (
                          <li>
                            <Link
                              className="block px-4 py-2 img-hover"
                              href="/admin/information"
                            >
                              Información de usuarios de departamento
                            </Link>
                          </li>
                        ) : user?.userType_usut_id === 2 ? (
                          <>
                            <li>
                              <Link
                                className="block px-4 py-2 img-hover"
                                href="/admin/adminTI/informationCoordinate"
                              >
                                Tabla de Coordinadores
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="block px-4 py-2 img-hover"
                                href="/admin/adminTI/informatioTI"
                              >
                                Tabla de TI
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="relative block px-4 py-2 img-hover"
                                href="/admin/adminTI/request"
                              >
                                Solicitudes
                                {requestCount > 0 && (
                                  <span className="absolute top-0 right-0 inline-block w-6 h-6 bg-red-500 text-white rounded-full text-center text-xs">
                                    {requestCount}
                                  </span>
                                )}
                              </Link>
                            </li>
                          </>
                        ) : (
                          <>
                            <li>
                              <Link
                                className="block px-4 py-2 img-hover"
                                href="/admin/adminControlnterno/formMaintenance"
                              >
                                Mantenimiento de formularios
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="block px-4 py-2 img-hover"
                                href="/admin/adminControlnterno/informationBoss"
                              >
                                Tabla de Jefes de Area
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="block px-4 py-2 img-hover"
                                href="/admin/adminControlnterno/informationEmployee"
                              >
                                Tabla de Empleados de area
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="block px-4 py-2 img-hover"
                                href="/admin/adminControlnterno/requestCoordinate"
                              >
                                Solicitudes
                              </Link>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </li>
            <li>
              {(user?.userType_usut_id === 5 ||
                user?.userType_usut_id === 4) && (
                <Link href="/form" className="img-hover">
                  Completar formulario
                </Link>
              )}
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
