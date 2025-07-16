import { Student, Subject } from "@/types/grade";
import { GradeInputRow } from "./GradeInputRow";
import { GRADE_COMPONENTS } from "@/lib/sample-data/gradeComponents";

interface Props {
     students: Student[];
     subject: Subject;
}

export const StudentGradeTable = ({ students, subject }: Props) => {
     return (
          <div className="overflow-x-auto border rounded-xl">
               <table className="min-w-full text-sm text-left border-collapse">
                    <thead className="bg-gray-100 text-gray-700">
                         <tr>
                              <th className="px-4 py-2">Nama</th>
                              {subject.bab.map((bab) => (
                                   <th key={bab} colSpan={5} className="text-center border-x">
                                        {bab}
                                   </th>
                              ))}
                              <th className="text-center px-4 py-2">Nilai Akhir</th>
                         </tr>
                         <tr>
                              <th />
                              {subject.bab.map((bab) =>
                                   GRADE_COMPONENTS.map((komp) => (
                                        <th key={`${bab}-${komp}`} className="text-center text-xs font-medium">
                                             {komp}
                                        </th>
                                   ))
                              )}
                              <th />
                         </tr>
                    </thead>

                    <tbody>
                         {students.map((siswa) => (
                              <GradeInputRow key={siswa.id} student={siswa} subject={subject} />
                         ))}
                    </tbody>
               </table>
          </div>
     );
};
