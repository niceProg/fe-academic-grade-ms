import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { GradeConfigForm } from "@/types/grade";

const gradeComponentSchema = z.object({
     Tugas: z.number().min(0, "Minimal 0").max(100, "Maksimal 100"),
     UTS: z.number().min(0).max(100),
     UAS: z.number().min(0).max(100),
     Proyek: z.number().min(0).max(100),
     Kuis: z.number().min(0).max(100),
});

const schema = z.object({
     componentWeights: gradeComponentSchema.refine((weights) => Object.values(weights).reduce((a, b) => a + b, 0) === 100, { message: "Total komponen harus 100%" }),
     babWeights: z
          .array(
               z.object({
                    babName: z.string().min(1, "Bab tidak boleh kosong"),
                    weights: gradeComponentSchema.refine((weights) => Object.values(weights).reduce((a, b) => a + b, 0) === 100, { message: "Total bobot bab harus 100%" }),
               })
          )
          .length(5, "Jumlah bab harus 5"),
});

export function useGradeConfigForm(defaults: GradeConfigForm) {
     return useForm<GradeConfigForm>({
          defaultValues: defaults,
          resolver: zodResolver(schema),
          mode: "onChange",
     });
}
