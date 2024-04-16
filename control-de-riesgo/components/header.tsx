"use client";
import { useState, useEffect  } from "react";
import Image from "next/image";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDoubleDropdownOpen, setIsDoubleDropdownOpen] = useState(false);
  const [isDropdownMobile, setIsDropdownMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
        if (isDropdownOpen) setIsDoubleDropdownOpen(false);
    };

  return (
    <nav className="relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src="https://flowbite.com/docs/images/logo.svg" width={40} height={40} alt="Flowbite" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span>
        </a>

        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          onClick={() => setIsDropdownMobile(!isDropdownMobile)}
          aria-expanded={isDropdownMobile}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        <div className={`${isDropdownMobile ? "block" : "hidden"} absolute top-full left-0 right-0 md:static md:block md:w-auto z-20`}>
          <ul className={`${isMobile ? "border border-gray-100 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700" : ""} flex flex-col p-4 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0`}>
            <li><a href="#" className="py-2 px-3 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">Home</a></li>
            <li className="relative">
              <button onClick={toggleDropdown} className="flex items-center justify-between w-full  text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">
                Dropdown
                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8l5 5 5-5" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="my-2 absolute z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                    <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Dashboard</a></li>
                    <li>
                      <button onClick={(e) => {e.stopPropagation(); setIsDoubleDropdownOpen(!isDoubleDropdownOpen);}} className="flex items-center justify-between w-full px-4 py-2 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white">
                        More Options
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8l5 5 5-5" />
                        </svg>
                      </button>

                      {isDoubleDropdownOpen && (
                        <ul className="absolute mx-2 top-10 left-full divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                          <li><a href="#" className="block px-4 py-2 dark:hover:bg-gray-600">Submenu Item 1</a></li>
                          <li><a href="#" className="block px-4 py-2 dark:hover:bg-gray-600">Submenu Item 2</a></li>
                        </ul>
                      )}
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li><a href="#" className="py-2 px-3 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">Services</a></li>
            <li><a href="#" className="py-2 px-3 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">Pricing</a></li>
            <li><a href="#" className="py-2 px-3 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
