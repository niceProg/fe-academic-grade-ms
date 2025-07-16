import { Student } from "@/types/grade";

export const generateStudents = (kelasId: string, count: number): Student[] => {
     return Array.from({ length: count }, (_, i) => ({
          id: `${kelasId}-S${i + 1}`,
          name: `Mahasiswa ${i + 1}`,
          nim: `20${kelasId.slice(-2)}00${String(i + 1).padStart(2, "0")}`,
     }));
};
