import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { GradeConfigForm } from "@/types/grade";

const weightSchema = z
     .object({
          Tugas: z.number().min(0).max(100),
          UTS: z.number().min(0).max(100),
          UAS: z.number().min(0).max(100),
          Proyek: z.number().min(0).max(100),
          Kuis: z.number().min(0).max(100),
     })
     .refine((obj) => Object.values(obj).reduce((a, b) => a + b, 0) === 100, {
          message: "Total komponen harus 100%",
     });

const schema = z.object({
     componentWeights: weightSchema,
     babWeights: z
          .array(
               z
                    .object({
                         babName: z.string(),
                         weights: weightSchema,
                    })
                    .refine((data) => Object.values(data.weights).reduce((a, b) => a + b, 0) === 100, { message: "Total bab harus 100%" })
          )
          .length(5),
});

export function useGradeConfigForm(defaults: GradeConfigForm) {
     return useForm<GradeConfigForm>({
          defaultValues: defaults,
          resolver: zodResolver(schema),
          mode: "onChange",
     });
}
