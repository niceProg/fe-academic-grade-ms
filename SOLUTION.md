## 🧠 Design Decisions
### 1. Framework & Library Pilihan

- Next.js (v14+) dengan App Router dipilih karena mendukung SSR, SEO-friendly, dan routing modular.
- Tailwind CSS digunakan untuk styling karena sifatnya utility-first, sangat cocok untuk rapid UI development.
- Material UI (MUI) digunakan untuk komponen yang lebih kompleks dan konsisten dalam tampilan form & dialog.
- React Hook Form dipilih untuk pengelolaan form state yang optimal, dengan performa tinggi dan integrasi validasi.
- Zod digunakan untuk schema-based validation agar validasi form lebih terstruktur dan robust.
- React Context API digunakan untuk global state seperti konfigurasi nilai (grade config) agar mudah diakses antar komponen.

```bash
src/
├── app/
│   └── dashboard/
│       └── kelas/
│           └── [kelasId]/
│               ├── konfigurasi/      ← Halaman konfigurasi komponen nilai (Tugas, UTS, UAS, dll)
│               └── input-nilai/      ← Halaman input nilai tiap mahasiswa
│
├── components/
│   └── dashboard/
│       ├── GradeInputRow.tsx        ← Input per baris mahasiswa
│       ├── StudentGradeTable.tsx    ← Tabel keseluruhan nilai
│       ├── SaveBar.tsx              ← Sticky bar untuk tombol simpan
│       ├── ClassCard.tsx            ← Kartu kelas untuk overview
│       ├── SummaryChart.tsx         ← Visualisasi rekap nilai per kelas
│       └── Header.tsx               ← Header dashboard
│
├── hooks/
│   ├── useClassData.ts              ← Custom hook untuk fetch & manajemen data kelas
│   └── useClassFilter.ts            ← Custom hook untuk pencarian dan filter semester
│
├── context/
│   └── GradeConfigContext.tsx       ← Global context untuk konfigurasi nilai
│
├── utils/
│   └── exportUtils.ts               ← Utility untuk ekspor data ke Excel/CSV
│
├── lib/
│   └── api.ts                       ← Wrapper untuk pemanggilan API
│
├── types/
│   └── grade.ts                     ← TypeScript types untuk struktur nilai
```

## ⚙️ Key Features & Justifikasi

```bash
| Fitur                    | Deskripsi                                                    | Alasan                                                                  |
|--------------------------|--------------------------------------------------------------|-------------------------------------------------------------------------|
| Modular Folder per Kelas | Struktur seperti `[kelasId]/input-nilai`                     | Mempermudah maintainability dan scalability                             |
| Dynamic Form Rendering   | Menggunakan `useFieldArray` dari React Hook Form             | Adaptif terhadap jumlah komponen nilai yang diatur                      |
| Persistensi Nilai        | Menyimpan nilai menggunakan tombol `Simpan` di `SaveBar.tsx` | Memisahkan logic penyimpanan agar tidak trigger otomatis tiap perubahan |
| Validasi Real-Time       | Menggunakan Zod + RHF                                        | Menjamin input valid sebelum dikirim ke backend                         |
| Responsif & Aksesibel    | MUI + Tailwind                                               | Kompatibel di berbagai perangkat dengan UI modern                       |
| Export Nilai             | Ekspor nilai ke file CSV/XLSX                                | Kebutuhan pelaporan OBE                                                 |
```

## 🔒 Error Handling & Production Notes

- Semua komponen dikembangkan dengan pendekatan type-safe menggunakan TypeScript.
- Masalah ESLint seperti no-unused-vars telah diselesaikan dengan menghapus atau menggunakan variabel yang dimaksud.
- Validasi linting diselesaikan untuk npm run build agar tidak gagal di production.

## 🏁 Deployment

- Next.js 14 App Router cocok untuk deployment di platform seperti Vercel atau Render.
- Gunakan environment variable untuk mengatur endpoint API dan secret.