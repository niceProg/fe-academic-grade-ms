import { useState, useMemo } from "react";
import { ClassData } from "@/types/grade";

export const useClassFilter = (classes: ClassData[]) => {
     const [search, setSearch] = useState("");
     const [selectedSemester, setSemester] = useState<number | null>(null);

     const filteredClasses = useMemo(() => {
          return classes.filter((kelas) => {
               const matchSearch = kelas.name.toLowerCase().includes(search.toLowerCase()) || kelas.subject.name.toLowerCase().includes(search.toLowerCase());
               const matchSemester = selectedSemester === null || kelas.semester === selectedSemester;
               return matchSearch && matchSemester;
          });
     }, [classes, search, selectedSemester]);

     return { search, setSearch, selectedSemester, setSemester, filteredClasses };
};
