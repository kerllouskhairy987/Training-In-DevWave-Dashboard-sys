"use client";

import Link from "next/link";
import {
  Search,
  CalendarDays,
  Bell,
  CircleUser,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const Navbar: React.FC = () => {
  const [show, setShow] = useState<boolean>(false); // typed state

  return (
    <>
      <nav className="bg-white flex justify-between w-full h-20 md:px-10 px-5 py-5 md:gap-10 gap-3">
        <div className="searchbar relative md:w-1/2 h-10 rounded-lg flex items-center md:ml-0 ml-8 px-3 gap-2 text-[#8c8c8c] text-lg">
          <Search
            size={24}
            className="text-[#8c8c8c]"
            onClick={() => setShow((prev) => !prev)}
          />
 <input
  type="text"
  placeholder="Search for anything"
  className={`md:w-full md:h-full text-[var(--topbartext)] md:opacity-100 md:translate-y-0 outline-none border-none bg-white md:static absolute transition z-10 md:top-0 top-[65px] md:left-0 left-[-50px] w-[90dvw] rounded-3xl duration-500 px-5 py-3 placeholder:text-[#8c8c8c]
    ${ show 
        ? "opacity-100 translate-y-0" 
        : "opacity-0 -translate-y-2 pointer-events-none md:opacity-100 md:translate-y-0 md:pointer-events-auto" 
    } md:block`}
/>

        </div>
        <div className="nav-right flex md:w-1/2 md:gap-6 gap-3 justify-between items-center">
          <div className="icons flex md:gap-6 gap-3">
            <CalendarDays size={24} className="text-[var(--topbartext)]" />
            <Bell size={24} className="text-[var(--topbartext)]" />
          </div>
          <div className="profile flex items-center gap-2 cursor-pointer">
            <div className="font-medium sm:text-sm text-[12px] text-[var(--topbartext)] text-right">
              <p className="">john doe</p>
              <p className="text-gray-600">Admin</p>
            </div>
            <CircleUser size={30} className="text-[var(--topbartext)]" />
            <ChevronDown size={20} className="text-[var(--topbartext)]" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
