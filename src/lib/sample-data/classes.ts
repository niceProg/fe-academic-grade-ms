import { ClassData } from "@/types/grade";
import { SUBJECTS } from "./subjects";
import { generateStudents } from "./students";

export const CLASSES: ClassData[] = [
     {
          id: "KLS01",
          name: "TI 4A",
          semester: 4,
          subject: SUBJECTS[0], // Pemrograman Web
          students: generateStudents("KLS01", 20),
     },
     {
          id: "KLS02",
          name: "TI 4B",
          semester: 4,
          subject: SUBJECTS[1], // Basis Data
          students: generateStudents("KLS02", 20),
     },
     {
          id: "KLS03",
          name: "TI 6A",
          semester: 6,
          subject: SUBJECTS[2], // Kecerdasan Buatan
          students: generateStudents("KLS03", 20),
     },
     {
          id: "KLS04",
          name: "TI 6B",
          semester: 6,
          subject: SUBJECTS[0], // Pemrograman Web
          students: generateStudents("KLS04", 20),
     },
     {
          id: "KLS05",
          name: "TI 6C",
          semester: 6,
          subject: SUBJECTS[1], // Basis Data
          students: generateStudents("KLS05", 20),
     },
];
