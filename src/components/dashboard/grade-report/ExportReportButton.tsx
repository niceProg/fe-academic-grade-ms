"use client";

import { useState } from "react";
import { Student, Subject } from "@/types/grade";
import { exportCSV, exportExcel, exportPDF } from "@/utils/exportUtils";

interface Props {
     students: Student[];
     subject: Subject;
     grades: any;
}

export const ExportReportButton = ({ students, subject, grades }: Props) => {
     const [format, setFormat] = useState<"csv" | "pdf" | "excel">("csv");

     const handleExport = () => {
          if (format === "csv") exportCSV(students, subject, grades);
          else if (format === "excel") exportExcel(students, subject, grades);
          else exportPDF(students, subject, grades);
     };

     return (
          <div className="flex justify-end items-center gap-2 mt-4">
               <select className="border rounded px-2 py-1 text-sm" value={format} onChange={(e) => setFormat(e.target.value as "csv" | "pdf" | "excel")}>
                    <option value="csv">CSV</option>
                    <option value="excel">Excel</option>
                    <option value="pdf">PDF</option>
               </select>

               <button onClick={handleExport} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                    Export
               </button>
          </div>
     );
};
