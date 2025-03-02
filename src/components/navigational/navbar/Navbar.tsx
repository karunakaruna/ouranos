"use client";

import NavItem from "./NavItem";
import { usePathname } from "next/navigation";

import {
  BiHome,
  BiSolidHome,
  BiPlanet,
  BiSolidPlanet,
  BiCog,
  BiSolidCog,
} from "react-icons/bi";
import { PiMagnifyingGlassBold, PiMagnifyingGlassFill } from "react-icons/pi";
import { HiClipboardList, HiOutlineClipboardList } from "react-icons/hi";
import { FaBell, FaRegBell } from "react-icons/fa6";
import { getUnreadNotificationsCount } from "@/lib/api/bsky/notification";
import { useQuery } from "@tanstack/react-query";
import { useAgent } from "@/app/providers/agent";

interface NavbarProps {
  collapsed?: boolean;
}

export default function Navbar({ collapsed = false }: NavbarProps) {
  const agent = useAgent();
  const pathname = usePathname();

  const {
    data: notificationsCount,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["notificationsCount"],
    queryFn: async () => {
      return getUnreadNotificationsCount(agent);
    },
    refetchInterval: 10000,
  });

  return (
    <nav className={`inline-flex flex-col gap-4 ${collapsed ? 'items-center' : 'items-start'} w-full`}>
      <NavItem
        href="/dashboard/home"
        icon={<BiHome className="text-xl" />}
        activeIcon={<BiSolidHome className="text-xl" />}
        title="Home"
        isActive={pathname === "/dashboard/home"}
        collapsed={collapsed}
      />
      <NavItem
        href="/dashboard/search"
        icon={<PiMagnifyingGlassBold className="text-xl" />}
        activeIcon={<PiMagnifyingGlassFill className="text-xl" />}
        title="Search"
        isActive={pathname.includes("search")}
        collapsed={collapsed}
      />
      <NavItem
        href="/dashboard/feeds"
        icon={<BiPlanet className="text-xl" />}
        activeIcon={<BiSolidPlanet className="text-xl" />}
        title="Feeds"
        isActive={pathname === "/dashboard/feeds"}
        collapsed={collapsed}
      />
      <NavItem
        href="/dashboard/lists"
        icon={<HiOutlineClipboardList className="text-xl" />}
        activeIcon={<HiClipboardList className="text-xl" />}
        title="Lists"
        isActive={pathname === "/dashboard/lists"}
        collapsed={collapsed}
      />
      <NavItem
        href="/dashboard/notifications"
        icon={<FaRegBell className="text-xl" />}
        activeIcon={<FaBell className="text-xl" />}
        title="Notifications"
        isActive={pathname.includes("notifications")}
        badge={notificationsCount ?? 0}
        collapsed={collapsed}
      />
      <NavItem
        href="/dashboard/settings"
        icon={<BiCog className="text-xl" />}
        activeIcon={<BiSolidCog className="text-xl" />}
        title="Settings"
        isActive={pathname.includes("settings")}
        collapsed={collapsed}
      />
    </nav>
  );
}
