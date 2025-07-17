"use client";

import { useFormContext } from "react-hook-form";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { GradeComponent, Student, Subject } from "@/types/grade";
import { GRADE_COMPONENTS } from "@/lib/sample-data/gradeComponents";

interface Props {
     students: Student[];
     subject: Subject;
     onError: (message: string) => void;
}

export const GradeFileImport = ({ students, subject, onError }: Props) => {
     const { setValue } = useFormContext();

     // Default nilai semua komponen untuk 1 bab
     const createDefaultComponentScores = (): Record<GradeComponent, number> => {
          return GRADE_COMPONENTS.reduce((acc, comp) => {
               acc[comp] = 0;
               return acc;
          }, {} as Record<GradeComponent, number>);
     };

     const parseAndSetGrades = (rows: string[][]) => {
          const expectedCols = subject.bab.length * GRADE_COMPONENTS.length;
          const errors: string[] = [];
          const newGrades: Record<string, Record<string, Record<GradeComponent, number>>> = {};

          rows.forEach((row, rowIndex) => {
               const student = students[rowIndex];
               if (!student) return;

               if (row.length !== expectedCols) {
                    errors.push(`Baris ${rowIndex + 1}: Jumlah kolom tidak sesuai. Diharapkan ${expectedCols}, ditemukan ${row.length}`);
                    return;
               }

               const studentGrades: Record<string, Record<GradeComponent, number>> = {};
               let colIndex = 0;

               for (const bab of subject.bab) {
                    const compScores: Record<GradeComponent, number> = createDefaultComponentScores();

                    for (const komp of GRADE_COMPONENTS) {
                         const rawVal = row[colIndex++]?.toString().trim();
                         const val = parseFloat(rawVal || "0");

                         if (isNaN(val) || val < 0 || val > 100) {
                              errors.push(`Baris ${rowIndex + 1}: Nilai "${rawVal}" untuk ${bab} - ${komp} tidak valid`);
                         }

                         compScores[komp] = isNaN(val) ? 0 : val;
                    }

                    studentGrades[bab] = compScores;
               }

               newGrades[student.id] = studentGrades;
          });

          if (errors.length > 0) {
               const msg = "Terjadi kesalahan saat import:\n\n" + errors.slice(0, 10).join("\n") + (errors.length > 10 ? `\n...dan ${errors.length - 10} error lainnya` : "");
               onError(msg);
               return;
          }

          setValue("grades", newGrades);
          return true;
     };

     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (!file) return;

          const extension = file.name.split(".").pop()?.toLowerCase();

          if (extension === "csv") {
               Papa.parse(file, {
                    complete: (result) => {
                         const rows = result.data as string[][];
                         parseAndSetGrades(rows);
                    },
                    skipEmptyLines: true,
               });
          } else if (extension === "xlsx") {
               const reader = new FileReader();
               reader.onload = (evt) => {
                    const data = new Uint8Array(evt.target?.result as ArrayBuffer);
                    const workbook = XLSX.read(data, { type: "array" });
                    const sheet = workbook.Sheets[workbook.SheetNames[0]];
                    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][];
                    parseAndSetGrades(rows);
               };
               reader.readAsArrayBuffer(file);
          } else {
               onError("Format file tidak didukung. Hanya menerima .csv atau .xlsx");
          }

          e.target.value = ""; // reset input
     };

     return (
          <div className="my-4">
               <label className="text-sm font-medium text-gray-700">Import Nilai (.csv atau .xlsx)</label>
               <input type="file" accept=".csv,.xlsx" onChange={handleFileChange} className="mt-1" />
          </div>
     );
};
