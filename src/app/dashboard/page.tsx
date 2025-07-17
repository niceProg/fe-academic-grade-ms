"use client";

import { ClassCard } from "@/components/dashboard/ClassCard";
import { SearchFilter } from "@/components/dashboard/SearchFilter";
import { useClassFilter } from "@/hooks/useClassFilter";
import { useClassData } from "@/hooks/useClassData";
import { ClassSummaryChart } from "@/components/dashboard/SummaryChart";
import { Header } from "@/components/dashboard/Header";

export default function ClassDashboardPage() {
     const { classes } = useClassData();
     const { filteredClasses, search, setSearch, selectedSemester, setSemester } = useClassFilter(classes);

     return (
          <div className="min-h-screen space-y-10 overflow-auto">
               <Header />

               {/* Divider */}
               <hr className="border-gray-300" />

               {/* Search + Filter */}
               <SearchFilter search={search} setSearch={setSearch} selectedSemester={selectedSemester} setSemester={setSemester} />

               {/* Grid */}
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {filteredClasses.map((kelas) => (
                         <ClassCard key={kelas.id} classData={kelas} />
                    ))}
               </div>

               {/* Divider */}
               <hr className="border-gray-300" />

               {/* Chart */}
               <ClassSummaryChart />
          </div>
     );
}
