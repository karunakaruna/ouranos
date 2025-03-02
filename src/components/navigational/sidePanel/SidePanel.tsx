"use client";

import Navbar from "../navbar/Navbar";
import Image from "next/image";
import Button from "@/components/actions/button/Button";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { useSidebarContext } from "@/app/providers/sidebar";

export default function SidePanel() {
  const { collapsed, initialRender, toggleSidebar } = useSidebarContext();

  return (
    <menu 
      className={`fixed left-0 top-0 h-full z-50 bg-skin-secondary border-r border-skin-base flex flex-col items-center transition-all duration-300 ease-in-out ${
        collapsed ? "w-16" : "w-64"
      } ${initialRender ? "opacity-0" : "opacity-100"}`}
    >
      <div className="w-full flex justify-between items-center p-3 border-b border-skin-base">
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline"
        >
          <div className="flex items-center gap-2 group">
            <Image
              src="/ouranos.svg"
              alt="Ouranos logo"
              width={30}
              height={30}
              priority
              className="block transition-transform ease-in-out duration-700 group-hover:rotate-180"
            />
            {!collapsed && (
              <Image
                src="/ouranosText.svg"
                alt="Ouranos text"
                width={70}
                height={22}
                priority
                className="transition-opacity duration-300"
              />
            )}
          </div>
        </Button>
        <Button 
          onClick={toggleSidebar} 
          className="text-skin-secondary hover:text-skin-base"
        >
          {collapsed ? <BiChevronRight className="text-lg" /> : <BiChevronLeft className="text-lg" />}
        </Button>
      </div>
      <div className="w-full overflow-y-auto overflow-x-hidden mt-4 flex-grow">
        <Navbar collapsed={collapsed} />
      </div>
    </menu>
  );
}
