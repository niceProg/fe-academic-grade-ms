"use client";

import { ChangeEvent } from "react";

interface Props {
     search: string;
     setSearch: (v: string) => void;
     selectedSemester: number | null;
     setSemester: (v: number | null) => void;
}

export const SearchFilter = ({ search, setSearch, selectedSemester, setSemester }: Props) => {
     const handleSearch = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

     const handleSemester = (e: ChangeEvent<HTMLSelectElement>) => {
          const val = e.target.value;
          setSemester(val === "all" ? null : parseInt(val));
     };

     return (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
               <input
                    type="text"
                    placeholder="Cari kelas atau mata kuliah"
                    value={search}
                    onChange={handleSearch}
                    className="w-full md:w-1/2 px-5 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
               />

               <select value={selectedSemester !== null ? selectedSemester : "all"} onChange={handleSemester} className="w-fit px-4 py-2 border border-gray-300 rounded-xl text-sm bg-white">
                    <option value="all">Semua Semester</option>
                    <option value="4">Semester 4</option>
                    <option value="6">Semester 6</option>
               </select>
          </div>
     );
};
