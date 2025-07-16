import { useMemo } from "react";
import { CLASSES } from "@/lib/sample-data/classes";
import { ClassData } from "@/types/grade";

/**
 * Ambil semua data kelas (bisa diganti API fetch nanti)
 */
export const useClassData = () => {
     return {
          classes: CLASSES,
     };
};

/**
 * Ambil data kelas berdasarkan ID (memakai sample-data sementara)
 */
export const useClassDataById = (kelasId: string): ClassData | undefined => {
     return useMemo(() => {
          return CLASSES.find((k) => k.id === kelasId);
     }, [kelasId]);
};
