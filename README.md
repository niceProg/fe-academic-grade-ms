# 📊 OBE Dashboard – Input Nilai Mahasiswa

![Next.js](https://img.shields.io/badge/Next.js-14.2.30-blue?logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.3-06B6D4?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![MUI](https://img.shields.io/badge/MUI-7.2.0-007FFF?logo=mui)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

Sistem dashboard untuk pengelolaan nilai berbasis OBE (Outcome Based Education) yang dibangun dengan **Next.js 14+, Tailwind CSS, React Hook Form**, dan **Framer Motion**. Sistem ini mendukung input nilai manual maupun impor file (CSV/XLSX), serta konfigurasi bobot nilai per bab dan komponen.

---

## 🚀 Fitur Utama

### 🔢 Input Nilai Mahasiswa
- Pencarian data dengan **debounce** menggunakan `lodash.debounce`.
- Visualisasi grafik menggunakan `Recharts`.
- Input nilai per mahasiswa dan per bab (materi).
- Menampilkan progress penyelesaian input nilai.
- Validasi nilai (rentang 0–100) dan struktur file impor.
- Auto-save draft nilai ke **localStorage**.
- Validasi form menggunakan **Zod** dan **React Hook Form**.
- Dukungan **Paste Nilai Massal** (bulk paste).
- Import nilai dari file berformat **.csv** atau **.xlsx**.

### ⚙️ Konfigurasi Komponen Nilai
- Pengaturan bobot nilai per bab dan komponen (Tugas, UTS, UAS, dll).
- Validasi agar total bobot per bab mencapai 100%.
- Preview distribusi bobot dalam bentuk matriks.

### 📈 Visualisasi & Laporan
- Ringkasan statistik kelas dalam bentuk **Bar Chart**.
- Breakdown nilai per siswa.
- Export laporan nilai ke format file tertentu.

### ✅ UX & UI
- Desain responsif untuk desktop dan tablet.
- Animasi transisi menggunakan **Framer Motion**.
- Notifikasi berbasis modal (sukses & error) menggunakan **Headless UI**.
- Sidebar dengan toggle hamburger.
- Komponen reusable dengan pendekatan **clean architecture**.

---

## 🧰 Tech Stack

### Frontend Libraries

- [Next.js 14](https://nextjs.org/)
- [React 18](https://reactjs.org/)
- [TailwindCSS 3](https://tailwindcss.com/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [MUI 7](https://mui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://github.com/colinhacks/zod)
- [Lucide React](https://lucide.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [PapaParse](https://www.papaparse.com/)
- [XLSX (SheetJS)](https://github.com/SheetJS/sheetjs)
- [jsPDF & jsPDF-AutoTable](https://github.com/parallax/jsPDF)
- [Headless UI](https://headlessui.com/)

### Dev Dependencies

- Eslint & eslint-config-next
- Tailwind CSS & PostCSS
- Autoprefixer
- Type Definitions (`@types/...`)

---

## 🛠️ Setup Instructions

### 1. Clone Repo

```bash
git clone https://github.com/your-username/obe-grade-dashboard.git
cd obe-grade-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

## Project Structure

```bash
/app
  └── context/
  └── dashboard/
      └── kelas/
          └── [kelasId]/
               └── input-nilai/
               └── konfigurasi/
/components
  └── dashboard/
      └── grade-config/
      └── grade-report/
      └── grade-input/
      └── shared/
/hooks
/lib
  └── sample-data/
/styles
/types
/utils
```

## ✍️ Kontribusi

### 1. Fork repository
### 2. Buat branch feature:

```bash
git checkout -b feature/fitur-baru
```

### 3. Commit:

```bash
git commit -m "Tambah fitur baru"
```

### 4. Push:

```bash
git push origin feature/fitur-baru
```

### 5. Buka Pull Request

## 📌 Catatan

- Data sample berada di lib/sample-data.
- LocalStorage digunakan untuk menyimpan draft input nilai per kelas.
- Jangan lupa validasi file sebelum upload nilai.

## 📧 Kontak

**Wisnu Yumna Yudhanta** <br/>
**Email: wisnu.yudhanta@gmail.com**