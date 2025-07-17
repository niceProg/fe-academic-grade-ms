import { GRADE_COMPONENTS } from "@/lib/sample-data/gradeComponents";
import { Student, Subject } from "@/types/grade";

export function calculateCompletionProgress(students: Student[], subject: Subject, grades: Record<string, Record<string, Record<string, number>>>) {
     const totalStudents = students.length;
     let completeStudents = 0;

     for (const student of students) {
          const stuGrades = grades?.[student.id];
          if (!stuGrades) continue;

          let allFilled = true;

          for (const bab of subject.bab) {
               for (const komp of GRADE_COMPONENTS) {
                    const v = stuGrades?.[bab]?.[komp];
                    if (typeof v !== "number" || isNaN(v) || v <= 0) {
                         allFilled = false;
                         break;
                    }
               }
               if (!allFilled) break;
          }

          if (allFilled) completeStudents++;
     }

     return { done: completeStudents, total: totalStudents };
}
