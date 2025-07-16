"use client";

import { useFormContext } from "react-hook-form";
import { Student, Subject } from "@/types/grade";
import { useState } from "react";
import { GRADE_COMPONENTS } from "@/lib/sample-data/gradeComponents";

interface Props {
     students: Student[];
     subject: Subject;
}

export const BulkPasteInput = ({ students, subject }: Props) => {
     const { setValue } = useFormContext();
     const [rawData, setRawData] = useState("");
     const [log, setLog] = useState<{ name: string; status: "success" | "error"; message: string }[]>([]);

     const handlePaste = () => {
          const lines = rawData.trim().split("\n");
          const newLog: typeof log = [];

          lines.forEach((line, idx) => {
               const values = line.trim().split(/\s+|,|\t/); // split tab or comma
               const student = students[idx];

               if (!student) {
                    newLog.push({ name: `Row ${idx + 1}`, status: "error", message: "Tidak ada data mahasiswa pada baris ini." });
                    return;
               }

               const studentId = student.id;
               let col = 0;
               let error = false;

               subject.bab.forEach((bab) => {
                    GRADE_COMPONENTS.forEach((komp) => {
                         const value = Number(values[col++]);
                         if (isNaN(value) || value < 0 || value > 100) {
                              error = true;
                         } else {
                              setValue(`grades.${studentId}.${bab}.${komp}`, value);
                         }
                    });
               });

               newLog.push({
                    name: student.name,
                    status: error ? "error" : "success",
                    message: error ? "Beberapa nilai tidak valid (pastikan 0–100)" : "Berhasil diisi",
               });
          });

          setLog(newLog);
     };

     return (
          <div className="my-6 space-y-4">
               <div>
                    <label className="block text-sm font-medium text-gray-700">Paste nilai dari spreadsheet</label>
                    <textarea
                         rows={6}
                         placeholder="Paste dari Excel: satu baris per siswa, nilai dipisah tab/koma"
                         value={rawData}
                         onChange={(e) => setRawData(e.target.value)}
                         className="w-full border rounded-xl px-3 py-2 font-mono text-sm"
                    />
                    <button onClick={handlePaste} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                         Apply to Table
                    </button>
               </div>

               {/* Log output */}
               {log.length > 0 && (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                         <h3 className="text-sm font-bold mb-2">📋 Hasil Import:</h3>
                         <ul className="space-y-1 text-sm">
                              {log.map((entry, i) => (
                                   <li key={i} className={entry.status === "success" ? "text-green-700" : "text-red-600"}>
                                        <strong>{entry.name}</strong>: {entry.message}
                                   </li>
                              ))}
                         </ul>
                    </div>
               )}
          </div>
     );
};
