"use client";

import { LayoutDashboard, BookOpen, MessageCircle, Book, Calendar, LogOut } from "lucide-react";
import Link from "next/link";
import { useSidebar } from "@/app/context/SidebarContext";

const menu = [
     { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
     { label: "Classes", icon: BookOpen, href: "/dashboard/kelas" },
     { label: "Discussions", icon: MessageCircle, href: "/dashboard/discussions" },
];

const insights = [
     { label: "Resources", icon: Book, href: "/dashboard/resources" },
     { label: "My Schedule", icon: Calendar, href: "/dashboard/schedule" },
];

export const Sidebar = () => {
     const { isSidebarOpen } = useSidebar();

     return (
          <aside
               className={`
                    fixed top-0 left-0 z-40 h-screen
                    transition-all duration-300 ease-in-out
                    bg-gradient-to-b from-blue-50 to-white shadow-inner
                    ${isSidebarOpen ? "w-64 px-6" : "w-16 px-2"}
                    py-8 flex flex-col justify-between
               `}
          >
               {/* Top Section */}
               <div className="space-y-6">
                    {/* Logo */}
                    <div className="text-xl font-extrabold text-gray-800 text-center">
                         {isSidebarOpen ? (
                              <>
                                   Lecture<span className="text-blue-500">.</span>
                              </>
                         ) : (
                              <span className="text-blue-500">L</span>
                         )}
                    </div>

                    {/* Profile Info */}
                    {isSidebarOpen && (
                         <div className="text-sm text-gray-600">
                              <p className="font-semibold">Wisnu Yumna Yudhanta, S.Tr.Kom</p>
                              <p className="text-xs text-gray-400">Dosen Pratikum</p>
                         </div>
                    )}

                    {/* Menu */}
                    <nav className="space-y-4">
                         {menu.map(({ label, icon: Icon, href }) => (
                              <Link
                                   key={label}
                                   href={href}
                                   className={`flex items-center transition text-sm text-gray-700 hover:text-blue-600 
                ${isSidebarOpen ? "gap-3 justify-start" : "justify-center"}`}
                              >
                                   <Icon className="w-5 h-5" />
                                   {isSidebarOpen && <span>{label}</span>}
                              </Link>
                         ))}
                    </nav>

                    {/* Divider */}
                    <hr className="border-gray-200" />

                    {/* Insights — tetap render icon meskipun sidebar ditutup */}
                    <div className="space-y-3">
                         {isSidebarOpen && <h3 className="text-xs font-semibold text-gray-500 uppercase">Insight</h3>}
                         {insights.map(({ label, icon: Icon, href }) => (
                              <Link
                                   key={label}
                                   href={href}
                                   className={`flex items-center transition text-sm text-gray-700 hover:text-blue-600 
                ${isSidebarOpen ? "gap-3 justify-start" : "justify-center"}`}
                              >
                                   <Icon className="w-5 h-5" />
                                   {isSidebarOpen && <span>{label}</span>}
                              </Link>
                         ))}
                    </div>
               </div>

               {/* Logout */}
               <div>
                    <Link
                         href="/logout"
                         className={`flex items-center transition text-sm text-red-500 hover:text-red-600 
            ${isSidebarOpen ? "gap-3 justify-start" : "justify-center"}`}
                    >
                         <LogOut className="w-5 h-5" />
                         {isSidebarOpen && <span>Logout</span>}
                    </Link>
               </div>
          </aside>
     );
};
