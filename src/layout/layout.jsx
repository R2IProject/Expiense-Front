// components/SidebarLayout.js
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
const SidebarItem = [
  {
    key: "1",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M36 6C34.4087 6 32.8826 6.63214 31.7574 7.75736C30.6321 8.88258 30 10.4087 30 12V36C30 37.5913 30.6321 39.1174 31.7574 40.2426C32.8826 41.3679 34.4087 42 36 42C37.5913 42 39.1174 41.3679 40.2426 40.2426C41.3679 39.1174 42 37.5913 42 36C42 34.4087 41.3679 32.8826 40.2426 31.7574C39.1174 30.6321 37.5913 30 36 30H12C10.4087 30 8.88258 30.6321 7.75736 31.7574C6.63214 32.8826 6 34.4087 6 36C6 37.5913 6.63214 39.1174 7.75736 40.2426C8.88258 41.3679 10.4087 42 12 42C13.5913 42 15.1174 41.3679 16.2426 40.2426C17.3679 39.1174 18 37.5913 18 36V12C18 10.4087 17.3679 8.88258 16.2426 7.75736C15.1174 6.63214 13.5913 6 12 6C10.4087 6 8.88258 6.63214 7.75736 7.75736C6.63214 8.88258 6 10.4087 6 12C6 13.5913 6.63214 15.1174 7.75736 16.2426C8.88258 17.3679 10.4087 18 12 18H36C37.5913 18 39.1174 17.3679 40.2426 16.2426C41.3679 15.1174 42 13.5913 42 12C42 10.4087 41.3679 8.88258 40.2426 7.75736C39.1174 6.63214 37.5913 6 36 6Z"
          stroke="white"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    label: "Overview",
    path: "overview",
    mode: "dev",
  },
  {
    key: "2",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 2V46M34 10H19C17.1435 10 15.363 10.7375 14.0503 12.0503C12.7375 13.363 12 15.1435 12 17C12 18.8565 12.7375 20.637 14.0503 21.9497C15.363 23.2625 17.1435 24 19 24H29C30.8565 24 32.637 24.7375 33.9497 26.0503C35.2625 27.363 36 29.1435 36 31C36 32.8565 35.2625 34.637 33.9497 35.9497C32.637 37.2625 30.8565 38 29 38H12"
          stroke="white"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    label: "Finances",
    path: "finances",
    mode: "dev",
  },
];
const SidebarLayout = ({ children }) => {
  const router = useRouter();
  const [isResponsive, setIsResponsive] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [LayoudHeader, setLayoudHeader] = useState("");

  useEffect(() => {
    const userRole = JSON.parse(localStorage.getItem("userInfo"));
    setUserRole(userRole);
    const handleSider = () => {
      setCollapsed(window.innerWidth <= 768);
      setIsResponsive(window.innerWidth <= 768);
    };

    handleSider();
    window.addEventListener("resize", handleSider);

    return () => {
      window.removeEventListener("resize", handleSider);
    };
  }, []);

  const pathname = router.pathname.split("/");
  const selectedKey =
    SidebarItem.find((item) => pathname[2] === item.path)?.key || "1";

  useEffect(() => {
    const LayoutHeader = SidebarItem.find((item) => pathname[2] === item.path);
    setLayoudHeader(LayoutHeader);
  }, [pathname]);

  const DeveloperKeys = ["1", "2"];
  let KeyItems = null;

  if (SidebarItem) {
    if (userRole?.role === "Developer") {
      KeyItems = SidebarItem.filter((item) => DeveloperKeys.includes(item.key));
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex bg-[#20232A] h-screen">
      <div className="flex flex-col w-[110px] items-center">
        <div className="mt-7">
          <Image
            src="/logo_white.svg"
            alt="logo"
            width={1000}
            height={1000}
            className="w-[40px] h-[40px]"
          />
        </div>
        <div className="flex flex-col mt-20 space-y-8">
          {KeyItems?.map((item) => (
            <div
              key={item.key}
              className={`px-8 ${
                selectedKey === item.key ? "border-l-4 rounded-l-[3px]" : ""
              }`}
            >
              <Link href={`/dashboard/${item.path}`}>
                <button className="text-gray-500 focus:outline-none focus:text-gray-700">
                  {item.icon}
                </button>
              </Link>
            </div>
          ))}
        </div>
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
          <h1 className="text-3xl font-bold font-Poppins text-white">
            {LayoudHeader?.label}
          </h1>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 bg-[#20232A]">{children}</main>
      </div>
    </div>
  );
};

export default SidebarLayout;
