"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useClassData } from "@/hooks/useClassData";

export const ClassSummaryChart = () => {
     const { classes } = useClassData();

     const chartData = classes.map((kelas) => ({
          name: kelas.name,
          total: kelas.students.length,
          completed: Math.round(Math.random() * kelas.students.length), // dummy completed
     }));

     return (
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-2xl">
               <h3 className="text-lg font-semibold mb-4">Summary Statistics</h3>

               <div className="h-64 overflow-x-auto">
                    <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={chartData} layout="vertical" margin={{ left: 40 }}>
                              <XAxis type="number" />
                              <YAxis type="category" dataKey="name" />
                              <Tooltip />
                              <Bar dataKey="total" fill="#3b82f6" radius={[0, 6, 6, 0]} />
                              <Bar dataKey="completed" fill="#facc15" radius={[0, 6, 6, 0]} />
                         </BarChart>
                    </ResponsiveContainer>
               </div>

               {/* Legend */}
               <div className="flex justify-center gap-6 mt-4 text-xs text-gray-700 font-medium">
                    <div className="flex items-center gap-2">
                         <span className="w-4 h-1 bg-blue-500 inline-block rounded" />
                         total students
                    </div>
                    <div className="flex items-center gap-2">
                         <span className="w-4 h-1 bg-yellow-400 inline-block rounded" />
                         completion status
                    </div>
               </div>
          </div>
     );
};
