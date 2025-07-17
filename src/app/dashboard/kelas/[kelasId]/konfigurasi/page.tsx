"use client";

import { FormProvider } from "react-hook-form";
import { useGradeConfigForm } from "@/hooks/useGradeConfigForm";
import { PreviewPanel } from "@/components/dashboard/grade-config/PreviewPanel";
import { SaveBar } from "@/components/dashboard/grade-config/SaveBar";
import { defaultConfig } from "@/lib/sample-data/defaultConfig";
import { GradeMatrixEditor } from "@/components/dashboard/grade-config/GradeMatrixEditor";
import { GradeConfigForm } from "@/types/grade";
import { Header } from "@/components/dashboard/Header";
import { useState } from "react";
import { SuccessModal } from "@/components/shared/SuccessModal";

export default function GradeConfigPage() {
     const [showSuccess, setShowSuccess] = useState(false);

     const methods = useGradeConfigForm(defaultConfig);
     const { handleSubmit } = methods;

     const onSubmit = async (data: GradeConfigForm) => {
          const allValid = data.babWeights.every((bab) => Object.values(bab.weights).reduce((a: number, b: number) => a + b, 0) === 100);

          if (!allValid) {
               alert("Setiap bab harus memiliki total bobot 100%");
               return;
          }

          console.log("✔️ Submit konfigurasi:", data);
          setShowSuccess(true);
     };

     // OPTIONAL: hapus jika tidak digunakan
     // Jika ingin tetap menghitung total, gunakan ini dengan tipe eksplisit
     // const totalBabWeight = watchedData.babWeights
     //   ?.map((bab) =>
     //     Object.values(bab.weights).reduce(
     //       (sum: number, val: number) => sum + (typeof val === "number" ? val : 0),
     //       0
     //     )
     //   )
     //   .reduce((sum: number, babTotal: number) => sum + babTotal, 0) ?? 0;

     return (
          <FormProvider {...methods}>
               <div className="min-h-screen space-y-10 overflow-auto">
                    <Header />
                    <hr className="border-gray-300" />
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                         <h1 className="text-2xl font-semibold">Konfigurasi Komponen Nilai</h1>

                         <section>
                              <h2 className="font-medium mb-2">Konfigurasi Bobot Nilai per Bab & Komponen</h2>
                              <GradeMatrixEditor />
                         </section>

                         <PreviewPanel />

                         <SaveBar onSave={handleSubmit(onSubmit)} />
                    </form>

                    <SuccessModal open={showSuccess} onClose={() => setShowSuccess(false)} message="Konfigurasi berhasil disimpan!" />
               </div>
          </FormProvider>
     );
}
