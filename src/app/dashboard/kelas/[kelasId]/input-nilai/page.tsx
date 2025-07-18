"use client";

import { useParams } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { useClassDataById } from "@/hooks/useClassData";
import { StudentGradeTable } from "@/components/dashboard/grade-input/StudentGradeTable";
import { SaveBar } from "@/components/dashboard/grade-input/SaveBar";
import { BulkPasteInput } from "@/components/dashboard/grade-input/BulkPasteInput";
import { GradeFileImport } from "@/components/dashboard/grade-input/GradeFileImport";
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { calculateCompletionProgress } from "@/hooks/useCompletionProgress";
import { ProgressBar } from "@/components/dashboard/grade-input/ProgressBar";
import { GradeBreakdownPanel } from "@/components/dashboard/grade-report/GradeBreakdownPanel";
import { ExportReportButton } from "@/components/dashboard/grade-report/ExportReportButton";
import { Header } from "@/components/dashboard/Header";
import { ErrorModal } from "@/components/shared/ErrorModal";
import { SuccessModal } from "@/components/shared/SuccessModal";

export default function GradeInputPage() {
     const { kelasId } = useParams();
     const kelas = useClassDataById(kelasId as string);

     const [hasMounted, setHasMounted] = useState(false);
     const [errorMessage, setErrorMessage] = useState("");
     const [showError, setShowError] = useState(false);
     const [showSuccess, setShowSuccess] = useState(false);

     const savedDraft = typeof window !== "undefined" ? localStorage.getItem(`draft-grades-${kelasId}`) : null;
     const defaultGrades = savedDraft ? JSON.parse(savedDraft) : {};

     const methods = useForm({
          defaultValues: {
               grades: defaultGrades || {},
          },
     });

     useEffect(() => {
          setHasMounted(true);
     }, []);

     useEffect(() => {
          if (!hasMounted) return;

          const subscription = methods.watch(
               debounce((data) => {
                    localStorage.setItem(`draft-grades-${kelasId}`, JSON.stringify(data.grades));
                    console.log("✔️ Autosaved to localStorage");
               }, 800)
          );

          return () => subscription.unsubscribe();
     }, [methods, kelasId, hasMounted]);

     const grades = methods.watch("grades");
     const progress = kelas ? calculateCompletionProgress(kelas.students, kelas.subject, grades) : { done: 0, total: 0 };

     const handleError = (msg: string) => {
          setErrorMessage(msg);
          setShowError(true);
     };

     if (!kelas) {
          return <p className="p-6">Memuat data kelas...</p>;
     }

     return (
          <FormProvider {...methods}>
               <div className="min-h-screen space-y-10 overflow-auto">
                    <Header />
                    <hr className="border-gray-300" />

                    <div className="space-y-6 pb-24">
                         <h1 className="text-2xl font-semibold">{kelas.name} - Input Nilai</h1>
                         <p className="text-sm text-gray-500">Mata Kuliah: {kelas.subject.name}</p>

                         <ProgressBar done={progress.done} total={progress.total} />

                         <GradeFileImport students={kelas.students} subject={kelas.subject} onError={handleError} />
                         <BulkPasteInput students={kelas.students} subject={kelas.subject} />
                         <StudentGradeTable students={kelas.students} subject={kelas.subject} />
                         <ExportReportButton students={kelas.students} subject={kelas.subject} grades={grades} />

                         {kelas.students.map((student) => (
                              <GradeBreakdownPanel key={student.id} student={student} subject={kelas.subject} allGrades={grades} />
                         ))}

                         <SaveBar
                              onSave={methods.handleSubmit((data) => {
                                   console.log("Nilai disubmit:", data.grades);
                                   setShowSuccess(true);
                              })}
                         />
                    </div>
               </div>

               {/* Modals */}
               <ErrorModal open={showError} onClose={() => setShowError(false)} message={errorMessage} />
               <SuccessModal open={showSuccess} onClose={() => setShowSuccess(false)} message="Nilai berhasil disimpan!" />
          </FormProvider>
     );
}
