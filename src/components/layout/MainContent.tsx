"use client";

import { ReactNode } from "react";
import { useSidebarContext } from "@/app/providers/sidebar";

interface MainContentProps {
  children: ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  const { collapsed } = useSidebarContext();

  return (
    <main 
      className={`bg-skin-base flex justify-center gap-4 pb-16 pt-10 md:mt-0 lg:gap-12 animate-fade w-full transition-all duration-300 ease-in-out overflow-y-auto ${
        collapsed ? "ml-16" : "ml-64"
      }`}
    >
      {children}
    </main>
  );
}
