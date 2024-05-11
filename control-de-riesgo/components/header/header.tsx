"use client";
import { useState, useEffect } from "react";
import { signOut,useSession } from "next-auth/react";
import { User } from "../../components/index";
import Image from "next/image";
import HeaderButtonMobile from "./headerButtonMobile";
import HeaderButton from "./headerButton";
import UserLog from "../user/userlog";
import Link from "next/link";



const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownMobile, setIsDropdownMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { data: session } = useSession();


  const handleSignOut = async () => {
    await signOut({ redirect: false });  // Evita la redirección automática de NextAuth
    window.location.href = 'https://login.microsoftonline.com/{AZURE_AD_TENANT_ID}/oauth2/v2.0/logout?post_logout_redirect_uri=' + encodeURIComponent(window.location.origin);
  };
  // const [user, setUser] = useState<User | null>(UserLog());
  const user = UserLog();
  // Permitir `null`

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
              <Link href="/homePage" className="py-2 px-3 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">  Home Usuario:
                {user && <h1>{session?.user?.name}</h1>}</Link>
            </li>
            <li className="relative">
              <HeaderButton onClick={toggleDropdown}>Maintenance</HeaderButton>

              {isDropdownOpen && (
                <div className="my-2 absolute z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <Link className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600" href="/admin/formMaintenance"> Form Maintenance</Link>
                    </li>
                    <li>
                    <Link className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600" href="/admin/userMaintenance"> User Maintenance</Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li>
              <Link href="/form" className="py-2 px-3 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">   Complete form</Link>
             
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
