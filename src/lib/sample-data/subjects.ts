import { Subject } from "@/types/grade";

export const SUBJECTS: Subject[] = [
     {
          id: "MK01",
          name: "Pemrograman Web",
          bab: ["HTML", "CSS", "JS Dasar", "React", "REST API"],
          weight: { Tugas: 20, UTS: 20, UAS: 25, Proyek: 25, Kuis: 10 },
     },
     {
          id: "MK02",
          name: "Basis Data",
          bab: ["ERD", "SQL", "Normalisasi", "Stored Procedure", "Optimasi"],
          weight: { Tugas: 25, UTS: 20, UAS: 25, Proyek: 20, Kuis: 10 },
     },
     {
          id: "MK03",
          name: "Kecerdasan Buatan",
          bab: ["Search", "Heuristic", "ANN", "CNN", "NLP"],
          weight: { Tugas: 15, UTS: 25, UAS: 30, Proyek: 20, Kuis: 10 },
     },
];
