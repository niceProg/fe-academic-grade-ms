"use client";

import { ReactNode } from "react";
import { SidebarProvider, useSidebar } from "@/app/context/SidebarContext";
import { Sidebar } from "@/components/dashboard/Sidebar";

function LayoutShell({ children }: { children: ReactNode }) {
     const { isSidebarOpen } = useSidebar();

     return (
          <>
               <Sidebar /> {/* Tetap fixed */}
               <div
                    className={`
                         transition-all duration-300 ease-in-out
                         ${isSidebarOpen ? "ml-64" : "ml-16"}
                         pt-6 px-6 min-h-screen
                         bg-gray-50
                    `}
               >
                    {children}
               </div>
          </>
     );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
     return (
          <SidebarProvider>
               <LayoutShell>{children}</LayoutShell>
          </SidebarProvider>
     );
}
