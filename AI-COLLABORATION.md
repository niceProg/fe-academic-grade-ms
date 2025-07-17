# 📘 Overview

Dokumen ini menjelaskan peran, integrasi, dan kontribusi Artificial Intelligence (AI) selama proses pengembangan aplikasi dashboard OBE (Outcome Based Education), baik dari sisi asisten teknis maupun ide kreatif.

## 🧠 AI Involvement Summary

AI, khususnya model ChatGPT (OpenAI GPT-4o), digunakan oleh pengembang sebagai asisten kolaboratif untuk:

- 💡 Ide arsitektur & UX
- 🧱 Struktur folder dan modularisasi komponen
- 📜 Refactor kode dan pattern reusability
- ✅ Validasi clean code dan form logic
- 🧪 Debugging logika frontend/backend
- 📄 Penulisan dokumentasi teknis dan user guide

## 🛠️ AI Contributions in Development

### 1. Design Decisions

- UX Suggestions: Struktur `dashboard/kelas/[kelasId]/input-nilai/` dan desain tab konfigurasi & input nilai.
- Component Architecture: Saran membuat `StudentGradeTable`, `GradeInputRow`, `SaveBar` untuk separation of concern.

### 2. Code Generation & Refactoring

- Generate komponen:
     - Dynamic table dari konfigurasi komponen nilai.
     - Input baris per mahasiswa secara efisien.
- Refactor React Context & Hook untuk shared state.
- Validation schema menggunakan zod/yup dengan integrasi ke React Hook Form.

### 3. Form UX Optimization

- Membantu merancang form dengan feedback cepat tanpa overkill alert (tidak pakai SweetAlert).
- Memastikan UX smooth dengan focus states dan keyboard accessibility.

### 4. Animation & Feedback

- Generate feedback popup animation (success/fail) untuk nilai.
- Implementasi animasi ringan tanpa mengganggu performa.

### 5. Content Writing

- Penulisan:
     - `README.md`
     - `USER-GUIDE.md`
     - `AI-COLLABORATION.md` (ini!)
- Menyesuaikan tone dengan profesional + friendly style.