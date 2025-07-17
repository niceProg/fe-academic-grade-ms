"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { GradeComponent, GradeConfigForm } from "@/types/grade";
import { GRADE_COMPONENTS } from "@/lib/sample-data/gradeComponents";

export const GradeMatrixEditor = () => {
     const { setValue, control } = useFormContext<GradeConfigForm>();
     const babWeights = useWatch({ control, name: "babWeights" });

     const updateWeight = (babIndex: number, comp: GradeComponent, newValue: number) => {
          const newWeights = [...babWeights];
          newWeights[babIndex].weights[comp] = newValue;
          setValue("babWeights", newWeights);
     };

     return (
          <div className="overflow-x-auto border rounded-xl">
               <table className="min-w-full text-sm text-left border-collapse">
                    <thead className="bg-gray-100 text-gray-700">
                         <tr>
                              <th className="px-4 py-2">Bab</th>
                              {GRADE_COMPONENTS.map((comp) => (
                                   <th key={comp} className="px-4 py-2 text-center">
                                        {comp}
                                   </th>
                              ))}
                              <th className="px-4 py-2 text-center">Total</th>
                         </tr>
                    </thead>
                    <tbody>
                         {babWeights.map((bab, idx) => {
                              const total = Object.values(bab.weights).reduce((sum, val) => sum + val, 0);
                              const isValid = total === 100;

                              return (
                                   <tr key={bab.babName} className="border-t">
                                        <td className="px-4 py-2 font-medium whitespace-nowrap">{bab.babName}</td>
                                        {GRADE_COMPONENTS.map((comp) => (
                                             <td key={comp} className="px-2 py-2 text-center">
                                                  <input type="range" min={0} max={100} step={1} value={bab.weights[comp]} onChange={(e) => updateWeight(idx, comp, Number(e.target.value))} />
                                                  <p className="text-xs mt-1">{bab.weights[comp]}%</p>
                                             </td>
                                        ))}
                                        <td className={`px-4 py-2 font-semibold text-center ${isValid ? "text-green-600" : "text-red-500"}`}>{total}%</td>
                                   </tr>
                              );
                         })}
                    </tbody>
               </table>
          </div>
     );
};
