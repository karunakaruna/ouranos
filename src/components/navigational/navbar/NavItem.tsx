"use client";

import Badge from "@/components/feedback/badge/Badge";
import Link from "next/link";
import { ReactNode } from "react";

interface NavItemProps {
  href: string;
  icon: ReactNode;
  activeIcon: ReactNode;
  title: string;
  isActive: boolean;
  badge?: number;
  collapsed?: boolean;
}

export default function NavItem({
  href,
  icon,
  activeIcon,
  title,
  isActive,
  badge,
  collapsed = false,
}: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 p-2 ${
        collapsed ? 'justify-center w-full' : 'px-3'
      } ${
        isActive
          ? "text-skin-accent"
          : "text-skin-tertiary hover:text-skin-base"
      }`}
    >
      <div className="relative">
        {isActive ? activeIcon : icon}
        {badge ? (
          <div className="absolute -top-1 -right-1">
            <Badge>{badge}</Badge>
          </div>
        ) : null}
      </div>
      {!collapsed && <span className="text-sm">{title}</span>}
    </Link>
  );
}
