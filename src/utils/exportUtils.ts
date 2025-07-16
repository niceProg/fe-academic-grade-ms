import { Student, Subject } from "@/types/grade";
import { GRADE_COMPONENTS } from "@/lib/sample-data/gradeComponents";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

// Template Export Data
export const generateExportData = (students: Student[], subject: Subject, grades: any): { header: string[]; rows: string[][] } => {
     const header: string[] = ["NIM", "Nama"];

     // Header dinamis: "Tugas 1", "UTS 1", dst.
     subject.bab.forEach((bab, index) => {
          const babIndex = index + 1;
          GRADE_COMPONENTS.forEach((komp) => {
               header.push(`${komp} ${babIndex}`);
          });
     });

     header.push("Final Score");

     const rows: string[][] = students.map((student) => {
          const row: string[] = [student.nim, student.name];
          let totalFinal = 0;

          subject.bab.forEach((bab) => {
               let totalBab = 0;

               GRADE_COMPONENTS.forEach((komp) => {
                    const value = grades?.[student.id]?.[bab]?.[komp] ?? 0;
                    const weight = subject.weight?.[komp] ?? 0;
                    const weighted = (value * weight) / 100;
                    row.push(Math.round(weighted).toString()); // Dibulatkan
                    totalBab += weighted;
               });

               totalFinal += totalBab;
          });

          const finalScore = Math.round(totalFinal / subject.bab.length).toString();
          row.push(finalScore);

          return row;
     });

     return { header, rows };
};

// Export to CSV
export const exportCSV = (students: Student[], subject: Subject, grades: any) => {
     const { header, rows } = generateExportData(students, subject, grades);
     const allRows = [header, ...rows];
     const csvContent = "data:text/csv;charset=utf-8," + allRows.map((r) => r.join(",")).join("\n");

     const encodedUri = encodeURI(csvContent);
     const link = document.createElement("a");
     link.setAttribute("href", encodedUri);
     link.setAttribute("download", "laporan_nilai.csv");
     document.body.appendChild(link);
     link.click();
     link.remove();
};

// Export to Excel
export const exportExcel = (students: Student[], subject: Subject, grades: any) => {
     const { header, rows } = generateExportData(students, subject, grades);
     const worksheet = XLSX.utils.aoa_to_sheet([header, ...rows]);
     const workbook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Nilai");
     XLSX.writeFile(workbook, "laporan_nilai.xlsx");
};

// Export to PDF (landscape + ukuran letter)
export const exportPDF = (students: Student[], subject: Subject, grades: any) => {
     const { header, rows } = generateExportData(students, subject, grades);
     const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "A4" });

     doc.setFontSize(14);
     doc.text("Laporan Nilai Mahasiswa", 40, 40);

     autoTable(doc, {
          head: [
               [
                    { content: "NIM", rowSpan: 2 },
                    { content: "Nama", rowSpan: 2 },
                    ...subject.bab.map((bab) => ({
                         content: bab,
                         colSpan: GRADE_COMPONENTS.length,
                         styles: { halign: "center" as const }, // ✅ fix here
                    })),
                    { content: "Nilai Akhir", rowSpan: 2 },
               ],
               [...subject.bab.flatMap(() => GRADE_COMPONENTS.map((komp) => komp))],
          ],
          body: rows,
          startY: 60,
          styles: {
               fontSize: 8,
               halign: "center" as const, // ✅ fix here
               valign: "middle",
          },
          headStyles: {
               fillColor: [41, 128, 185],
               textColor: 255,
               fontSize: 8,
          },
          columnStyles: {
               0: { cellWidth: 50, halign: "left" as const },
               1: { cellWidth: 60, halign: "left" as const },
          },
          didDrawPage: (data) => {
               const pageSize = doc.internal.pageSize;
               const pageWidth = pageSize.width;
               const pageHeight = pageSize.height;
               const currentPage = doc.getCurrentPageInfo().pageNumber;
               const pageCount = doc.getNumberOfPages();

               doc.setFontSize(9);
               doc.text(`Halaman ${currentPage} dari ${pageCount}`, pageWidth - 110, pageHeight - 25);
          },
     });

     doc.save("laporan_nilai.pdf");
};
