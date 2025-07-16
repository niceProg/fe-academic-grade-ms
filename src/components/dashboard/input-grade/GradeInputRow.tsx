"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { useMemo, useEffect, useState } from "react";
import { Student, Subject, GradeComponent } from "@/types/grade";
import { GRADE_COMPONENTS } from "@/lib/sample-data/gradeComponents";

interface Props {
     student: Student;
     subject: Subject;
}

const WEIGHTS: Record<GradeComponent, number> = {
     Tugas: 0.2,
     UTS: 0.25,
     UAS: 0.3,
     Proyek: 0.15,
     Kuis: 0.1,
};

export const GradeInputRow = ({ student, subject }: Props) => {
     const {
          register,
          formState: { errors },
          control,
     } = useFormContext();

     const [hydrated, setHydrated] = useState(false);

     useEffect(() => {
          setHydrated(true);
     }, []);

     // ⬇️ Watch all grade values for this student in real-time
     const grades = useWatch({ control, name: `grades.${student.id}` });

     const hasError = useMemo(() => {
          return subject.bab.some((bab) => GRADE_COMPONENTS.some((komp) => !!(errors.grades as any)?.[student.id]?.[bab]?.[komp]));
     }, [errors.grades, student.id, subject.bab]);

     const finalScore = useMemo(() => {
          if (!grades) return "-";

          let total = 0;
          let count = 0;

          for (const bab of subject.bab) {
               const komps = grades[bab];
               if (!komps) continue;

               let babTotal = 0;
               let valid = false;

               for (const komp of GRADE_COMPONENTS) {
                    const nilai = komps?.[komp];
                    if (typeof nilai === "number" && !isNaN(nilai) && nilai >= 0 && nilai <= 100) {
                         babTotal += nilai * WEIGHTS[komp];
                         valid = true;
                    }
               }

               if (valid) {
                    total += babTotal;
                    count++;
               }
          }

          return count > 0 ? (total / count).toFixed(2) : "-";
     }, [grades, subject.bab]);

     const finalScoreColor = useMemo(() => {
          if (!hydrated || finalScore === "-") return "text-gray-400";
          const numericScore = parseFloat(finalScore);
          return numericScore < 70 ? "text-red-600" : "text-blue-600";
     }, [finalScore, hydrated]);

     return (
          <tr className={`border-t ${hasError ? "bg-red-50" : ""}`}>
               <td className="px-4 py-2 font-medium whitespace-nowrap">{student.name}</td>

               {subject.bab.flatMap((bab) =>
                    GRADE_COMPONENTS.map((komp) => {
                         const fieldError = (errors.grades as any)?.[student.id]?.[bab]?.[komp];

                         return (
                              <td key={`${student.id}-${bab}-${komp}`} className="relative">
                                   <input
                                        type="number"
                                        min={0}
                                        max={100}
                                        {...register(`grades.${student.id}.${bab}.${komp}`, {
                                             valueAsNumber: true,
                                             required: "Wajib diisi",
                                             min: { value: 0, message: "0-100" },
                                             max: { value: 100, message: "0-100" },
                                        })}
                                        className={`w-16 px-2 py-1 text-center border rounded ${fieldError ? "border-red-500" : "border-gray-300"}`}
                                   />
                                   {fieldError && (
                                        <span className="absolute -top-1 -right-1 text-xs text-red-500" title={fieldError.message}>
                                             !
                                        </span>
                                   )}
                              </td>
                         );
                    })
               )}

               <td
                    className={`px-4 py-2 font-semibold text-center whitespace-nowrap transition-colors duration-300 ${finalScoreColor}`}
               >
                    {hydrated ? finalScore : "-"}
               </td>
          </tr>
     );
};
