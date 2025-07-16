import { GradeConfigForm } from "@/types/grade";

export const defaultConfig: GradeConfigForm = {
     componentWeights: {
          Tugas: 20,
          UTS: 20,
          UAS: 25,
          Proyek: 25,
          Kuis: 10,
     },
     babWeights: [
          { babName: "Bab 1", weights: { Tugas: 20, UTS: 20, UAS: 20, Proyek: 20, Kuis: 20 } },
          { babName: "Bab 2", weights: { Tugas: 20, UTS: 20, UAS: 20, Proyek: 20, Kuis: 20 } },
          { babName: "Bab 3", weights: { Tugas: 20, UTS: 20, UAS: 20, Proyek: 20, Kuis: 20 } },
          { babName: "Bab 4", weights: { Tugas: 20, UTS: 20, UAS: 20, Proyek: 20, Kuis: 20 } },
          { babName: "Bab 5", weights: { Tugas: 20, UTS: 20, UAS: 20, Proyek: 20, Kuis: 20 } },
     ],
};
