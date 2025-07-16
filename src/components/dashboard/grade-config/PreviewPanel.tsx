"use client";

import { useFormContext, useWatch } from "react-hook-form";
import type { GradeConfigForm } from "@/types/grade";
import { GRADE_COMPONENTS } from "@/lib/sample-data/gradeComponents";

export const PreviewPanel = () => {
     /** -------------------------------------------------
      * 1) Ambil `control` dari RHF context
      * 2) Gunakan `useWatch({ control })`  (tanpa argumen `name`)
      *    Ini membuat TypeScript mengerti return‑type = GradeConfigForm
      * ------------------------------------------------*/
     const { control } = useFormContext<GradeConfigForm>();
     const data = useWatch({ control }) as GradeConfigForm;

     /** Hitung total kontribusi setiap komponen */
     const totalPerComponent = GRADE_COMPONENTS.map((comp) => {
          const total = (data.babWeights ?? []).reduce<number>((acc, bab) => {
               return acc + (bab.weights[comp] ?? 0);
          }, 0);
          return { comp, total };
     });

     /** UI */
     return (
          <div className="bg-white p-4 rounded-xl border shadow-sm">
               <h2 className="text-lg font-semibold mb-2">Preview Ringkasan Kontribusi</h2>

               {totalPerComponent.every(({ total }) => total === 0) ? (
                    <p className="text-sm text-gray-500">Belum ada data bab.</p>
               ) : (
                    <ul className="space-y-1 text-sm text-gray-700">
                         {totalPerComponent.map(({ comp, total }) => (
                              <li key={comp}>
                                   <strong>{comp}:</strong> {total}% total dari semua bab
                              </li>
                         ))}
                    </ul>
               )}
          </div>
     );
};
