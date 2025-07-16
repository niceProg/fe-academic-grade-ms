import { ClassData } from "@/types/grade";
import Link from "next/link";
import { Pencil, Settings } from "lucide-react";

interface Props {
     classData: ClassData;
}

export const ClassCard = ({ classData }: Props) => {
     return (
          <div className="bg-gradient-to-b from-[#eaf5f0] to-[#ffffff] rounded-2xl shadow-md px-5 py-6 flex flex-col justify-between h-64 w-full text-center">
               {/* Header */}
               <h3 className="text-xl font-extrabold text-center mb-2">{classData.name}</h3>

               {/* Details */}
               <div className="text-sm text-gray-700 space-y-1 mb-6">
                    <p className="text-gray-500">Semester {classData.semester}</p>
                    <p>
                         <span className="font-semibold">Jumlah Mahasiswa:</span> {classData.students.length}
                    </p>
                    <p>
                         <span className="font-semibold">Mata Kuliah:</span> {classData.subject.name}
                    </p>
               </div>

               {/* Buttons */}
               <div className="flex justify-center gap-3">
                    <Link href={`/dashboard/kelas/${classData.id}/input-nilai`} className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white text-sm font-medium shadow hover:shadow-md transition">
                         <Pencil className="w-4 h-4" />
                         Nilai
                    </Link>

                    <Link href={`/dashboard/kelas/${classData.id}/konfigurasi`} className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white text-sm font-medium shadow hover:shadow-md transition">
                         <Settings className="w-4 h-4" />
                         Konfigurasi
                    </Link>
               </div>
          </div>
     );
};
