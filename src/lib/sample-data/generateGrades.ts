import { GradeEntry } from "@/types/grade";
import { CLASSES } from "./classes";
import { GRADE_COMPONENTS } from "./gradeComponents";

export const generateAllGrades = (): GradeEntry[] => {
     const grades: GradeEntry[] = [];

     for (const kelas of CLASSES) {
          for (const student of kelas.students) {
               for (const comp of GRADE_COMPONENTS) {
                    grades.push({
                         studentId: student.id,
                         subjectId: kelas.subject.id,
                         component: comp,
                         score: Math.floor(Math.random() * 41) + 60, // nilai antara 60-100
                    });
               }
          }
     }

     return grades;
};
