"use client";

import { Menu } from "lucide-react";
import { useSidebar } from "@/app/context/SidebarContext";
import { useState } from "react";

export const Header = () => {
     const { toggleSidebar } = useSidebar();

     const [open, setOpen] = useState(false);

     return (
          <header className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-4">
                    <button onClick={toggleSidebar} className="p-2 rounded hover:bg-gray-200">
                         <Menu className="w-6 h-6" />
                    </button>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
               </div>

               <div className="relative">
                    <button onClick={() => setOpen(!open)} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-200">
                         <div className="w-9 h-9 bg-white/80 rounded-full">
                              <span className="text-2xl">👤</span>
                         </div>
                         <span className="font-medium">Wisnu</span>
                    </button>

                    {open && (
                         <div className="absolute right-0 mt-2 w-64 bg-gradient-to-b from-blue-100 to-blue-50 rounded-2xl shadow-xl z-50 border border-gray-200 overflow-hidden">
                              <div className="bg-gradient-to-b from-blue-100 to-blue-50 text-gray-700 text-center py-4">
                                   <div className="w-20 h-20 rounded-full mx-auto bg-white/80 flex items-center justify-center shadow-md">
                                        <span className="text-3xl">👤</span>
                                   </div>
                                   <p className="mt-2 font-semibold">Wisnu Yumna Yudhanta, S.Tr.Kom</p>
                                   <p className="text-sm text-gray-500">usr_id</p>
                              </div>

                              <div className="p-4 space-y-3 bg-white">
                                   <button className="w-full py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-medium text-sm">Panduan</button>
                                   <div className="flex gap-2">
                                        <button className="flex-1 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-medium text-sm">Profil</button>
                                        <button className="flex-1 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-medium text-sm">Logout</button>
                                   </div>
                              </div>
                         </div>
                    )}
               </div>
          </header>
     );
};
