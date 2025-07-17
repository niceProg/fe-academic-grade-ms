export type GradeComponent = "Tugas" | "UTS" | "UAS" | "Proyek" | "Kuis";

export interface Student {
     id: string;
     name: string;
     nim: string;
}

export interface GradeEntry {
     studentId: string;
     subjectId: string;
     component: GradeComponent;
     score: number; // 0-100
}

export interface Subject {
     id: string;
     name: string;
     bab: string[];
     weight: Record<GradeComponent, number>; // Bobot tiap komponen
}

export interface ClassData {
     id: string;
     name: string;
     semester: number;
     subject: Subject;
     students: Student[];
}

export type ComponentWeights = Record<GradeComponent, number>;

export interface BabWeight {
     babName: string;
     weights: ComponentWeights;
}

export interface GradeConfigForm {
     componentWeights: ComponentWeights;
     babWeights: BabWeight[]; // length = 5
}
