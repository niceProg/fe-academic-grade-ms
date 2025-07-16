"use client";

import { Student, Subject } from "@/types/grade";
import { GRADE_COMPONENTS } from "@/lib/sample-data/gradeComponents";

interface Props {
     student: Student;
     subject: Subject;
     allGrades: any;
}

export const GradeBreakdownPanel = ({ student, subject, allGrades }: Props) => {
     const grades = allGrades?.[student.id];

     const breakdown = subject.bab.map((bab) => {
          const nilai = grades?.[bab];
          const komponen = GRADE_COMPONENTS.map((komp) => {
               const value = typeof nilai?.[komp] === "number" ? nilai[komp] : 0;
               const weight = subject.weight[komp] || 0;
               const weighted = value * (weight / 100);

               return { name: komp, value, weight, weighted };
          });

          const totalBab = komponen.reduce((sum, c) => sum + c.weighted, 0);

          return { bab, komponen, totalBab };
     });

     const finalScore = breakdown.length > 0 ? (breakdown.reduce((sum, b) => sum + b.totalBab, 0) / breakdown.length).toFixed(2) : "-";

     return (
          <div className="border p-4 rounded-xl space-y-4 bg-white shadow-sm">

               <div>
                    <h3 className="text-lg font-semibold text-gray-800">{student.name}</h3>
                    <p className="text-sm text-gray-500">NIM: {student.nim}</p>
               </div>

               <div className="overflow-auto">
                    <table className="w-full text-sm border">
                         <thead className="bg-gray-100">
                              <tr>
                                   <th className="p-2 text-left">Bab</th>
                                   {GRADE_COMPONENTS.map((c) => (
                                        <th key={c} className="p-2 text-center">
                                             {c}
                                        </th>
                                   ))}
                                   <th className="p-2 text-center">Total Bab</th>
                              </tr>
                         </thead>
                         <tbody>
                              {breakdown.map((b) => (
                                   <tr key={b.bab} className="border-t">
                                        <td className="p-2">{b.bab}</td>
                                        {b.komponen.map((c) => (
                                             <td key={c.name} className="p-2 text-center">
                                                  {c.value} × {c.weight} = <span className="font-semibold">{c.weighted.toFixed(2)}</span>
                                             </td>
                                        ))}
                                        <td className="p-2 text-center font-medium">{b.totalBab.toFixed(2)}</td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>
               </div>

               <p className="text-md text-blue-600 font-semibold">Nilai Akhir: {finalScore}</p>
          </div>
     );
};
