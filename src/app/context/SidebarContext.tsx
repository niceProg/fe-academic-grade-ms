"use client";

import { createContext, useContext, useState } from "react";

interface SidebarContextType {
     isSidebarOpen: boolean;
     toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
     const [isSidebarOpen, setSidebarOpen] = useState(true);
     const toggleSidebar = () => setSidebarOpen((prev) => !prev);

     return <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>{children}</SidebarContext.Provider>;
};

export const useSidebar = () => {
     const context = useContext(SidebarContext);
     if (!context) throw new Error("useSidebar must be used within SidebarProvider");
     return context;
};
