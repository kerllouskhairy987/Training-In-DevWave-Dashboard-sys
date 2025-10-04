"use client";

import {
  BriefcaseBusiness,
  ChartNoAxesColumnDecreasing,
  ClipboardList,
  FileCheck2,
  LayoutDashboard,
  ListCollapse,
  PanelsTopLeft,
  Settings,
  ShoppingBasket,
  Users,
  X,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, ReactNode } from "react";

interface SidebarLink {
  id: number;
  title: string;
  path: string;
  icon: ReactNode;
}

const sidebarLinks: SidebarLink[] = [
  {
    id: 1,
    title: "Dashboard (overview)",
    path: "/dashboard",
    icon: <LayoutDashboard size={24} />,
  },
  {
    id: 2,
    title: "Orders",
    path: "/orders",
    icon: <ShoppingBasket size={24} />,
  },
  {
    id: 3,
    title: "Menu Management",
    path: "/menu",
    icon: <ClipboardList size={24} />,
  },
  {
    id: 4,
    title: "Categories",
    path: "/categories",
    icon: <ListCollapse size={24} />,
  },
  {
    id: 5,
    title: "Inventory",
    path: "/inventory",
    icon: <FileCheck2 size={24} />,
  },
  {
    id: 6,
    title: "Customers",
    path: "/customers",
    icon: <Users size={24} />,
  },
  {
    id: 7,
    title: "Staff",
    path: "/staff",
    icon: <BriefcaseBusiness size={24} />,
  },
  {
    id: 8,
    title: "Analytics / Reports",
    path: "/analytics",
    icon: <ChartNoAxesColumnDecreasing size={24} />,
  },
  {
    id: 9,
    title: "Settings",
    path: "/settings",
    icon: <Settings size={24} />,
  },
];

const AppSidebar: React.FC = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden z-50 mt-3 fixed left-5 top-3 md:mt-2 bg-[var(--secondarycolor)] text-white p-1 rounded-lg shadow-lg"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-[var(--secondarycolor)] 
              md:w-full w-[80vw]
              md:max-w-1/4 
              flex flex-col gap-4 md:gap-2 
              h-screen md:h-screen 
              px-6 py-8 
              fixed  top-0 left-0 z-40 
              transition-transform duration-300
              ${open ? "translate-x-0" : "-translate-x-full"} 
              md:translate-x-0`}
      >
        {/* Logo */}
        <div className="logo md:h-20 flex text-white justify-end">
          <PanelsTopLeft className="size-6" />
        </div>

        {/* Title */}
        <h2 className="font-medium xl:text-4xl md:text-2xl text-xl text-white">
          Restaurant Dashboard
        </h2>

        {/* Navigation Links */}
        <ul className="flex flex-col mt-4 gap-4 md:gap-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <li key={link.id}>
                <Link
                  href={link.path}
                  className={`flex items-center gap-4 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-[var(--sideHover)] text-black font-bold"
                      : "text-white hover:text-black hover:bg-white/30"
                  }`}
                >
                  {link.icon}
                  <span className="md:text-md text-sm font-semibold">
                    {link.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default AppSidebar;
