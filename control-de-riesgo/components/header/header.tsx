"use client";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import HeaderButtonMobile from "./headerButtonMobile";
import HeaderButton from "./headerButton";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';


const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownMobile, setIsDropdownMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const {data:session}=useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });  // Evita la redirección automática de NextAuth
    router.push('/');  // Redirige al usuario al login manualmente
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  return (
    <nav className="relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            width={40}
            height={40}
            alt="image"
          />
        </div>

        <HeaderButtonMobile
          onClick={() => setIsDropdownMobile(!isDropdownMobile)}
          ariaExpanded={isDropdownMobile}
        >
          Open main menu
        </HeaderButtonMobile>

        <div
          className={`${
            isDropdownMobile ? "block" : "hidden"
          } absolute top-full left-0 right-0 md:static md:block md:w-auto z-20`}
        >
          <ul
            className={`${
              isMobile
                ? "border border-gray-100 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
                : ""
            } flex flex-col p-4 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0`}
          >
            <li>
              <a
                href="/homePage"
                className="py-2 px-3 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
              >
                Home
              </a>
            </li>
            <li className="relative">
              <HeaderButton onClick={toggleDropdown}>Maintenance</HeaderButton>

              {isDropdownOpen && (
                <div className="my-2 absolute z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <a
                        href="/formMaintenance"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Form Maintenance
                      </a>
                    </li>
                    <li>
                      <a
                        href="/userMaintenance"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        User Maintenance
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li>
              <a
                href="/form"
                className="py-2 px-3 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
              >
                Complete form
              </a>
            </li>
            <li>
              <button
                onClick={handleSignOut}
                className="px-3 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
              >
                Sign off
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
