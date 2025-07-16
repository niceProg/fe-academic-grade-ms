"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { BabWeight } from "@/types/grade";

export const SaveBar = ({ onSave }: { onSave: () => void }) => {
     const { control } = useFormContext();
     const babWeights = (useWatch({ control, name: "babWeights" }) || []) as BabWeight[];

     const allOk = babWeights.every((bw) => Object.values(bw.weights).reduce((s, v) => s + Number(v ?? 0), 0) === 100);

     return (
          <div className="flex justify-end">
               <button
                    onClick={onSave}
                    disabled={!allOk}
                    className={`px-5 py-2 rounded-xl text-white transition
          ${allOk ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
               >
                    Simpan Konfigurasi
               </button>
          </div>
     );
};
