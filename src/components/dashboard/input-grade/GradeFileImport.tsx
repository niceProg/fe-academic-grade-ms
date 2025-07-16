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

     const parseAndSetGrades = (rows: string[][]) => {
          const expectedCols = subject.bab.length * GRADE_COMPONENTS.length;
          const errors: string[] = [];
          const newGrades: any = {};

          rows.forEach((row, rowIndex) => {
               const student = students[rowIndex];
               if (!student) return;

               if (row.length !== expectedCols) {
                    errors.push(`Baris ${rowIndex + 1}: Jumlah kolom tidak sesuai. Diharapkan ${expectedCols}, ditemukan ${row.length}`);
                    return;
               }

               const gradeObj: any = {};
               let i = 0;

               subject.bab.forEach((bab) => {
                    gradeObj[bab] = {};
                    GRADE_COMPONENTS.forEach((komp) => {
                         const rawVal = row[i++]?.toString().trim();
                         const val = parseFloat(rawVal || "0");

                         if (isNaN(val) || val < 0 || val > 100) {
                              errors.push(`Baris ${rowIndex + 1}: Nilai "${rawVal}" untuk ${bab} - ${komp} tidak valid`);
                         }

                         gradeObj[bab][komp as GradeComponent] = isNaN(val) ? 0 : val;
                    });
               });

               newGrades[student.id] = gradeObj;
          });

          if (errors.length > 0) {
               const msg = "Terjadi kesalahan saat import:\n\n" + errors.slice(0, 10).join("\n") + (errors.length > 10 ? `\n...dan ${errors.length - 10} error lainnya` : "");
               onError(msg); // panggil modal error
               return;
          }

          setValue("grades", newGrades); // ✅ set hanya jika tidak ada error
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
                         parseAndSetGrades(rows); // return false will skip setValue
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

                    parseAndSetGrades(rows); // same here
               };
               reader.readAsArrayBuffer(file);
          } else {
               onError("Format file tidak didukung. Hanya menerima .csv atau .xlsx");
          }

          // clear input so same file can be re-uploaded
          e.target.value = "";
     };

     return (
          <div className="my-4">
               <label className="text-sm font-medium text-gray-700">Import Nilai (.csv atau .xlsx) </label>
               <input type="file" accept=".csv,.xlsx" onChange={handleFileChange} className="mt-1" />
          </div>
     );
};
