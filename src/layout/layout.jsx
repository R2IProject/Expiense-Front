// components/SidebarLayout.js
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const SidebarLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex bg-[#20232A] h-screen">
      <div className="flex flex-col w-32 items-center">
        <div className="mt-7">
          <Image
            src="/logo_white.svg"
            alt="logo"
            width={1000}
            height={1000}
            className="w-[100px] h-[50px]"
          />
        </div>
        <p>Dashboard</p>
      </div>
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#20232A] h-28 p-4 flex justify-between items-center">
          <button
            className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden"
            onClick={toggleSidebar}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-white">Dashboard</h1>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
};

export default SidebarLayout;
