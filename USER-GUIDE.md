# 🎯 Overview

Aplikasi ini adalah dashboard penilaian OBE (Outcome Based Education) untuk dosen, yang memungkinkan pengelolaan kelas, konfigurasi komponen nilai, dan penginputan nilai mahasiswa. Sistem ini dikembangkan menggunakan Next.js 14 App Router, Tailwind CSS, Material UI, dan React Hook Form.

## 🚪 Login dan Akses

- Masuk ke aplikasi dengan kredensial dosen Anda.
- Setelah login, Anda akan diarahkan ke Dashboard Kelas, yang berisi daftar seluruh kelas yang Anda ampu.

## 📚 Dashboard Kelas
### Fitur Utama:

- 🔍 Search Bar untuk mencari kelas berdasarkan nama.
- 🎓 Filter Semester untuk menampilkan kelas berdasarkan semester tertentu.
- 📊 Ringkasan Kelas (Chart) yang menampilkan visualisasi distribusi kelas.

### Aksi:

- Klik pada kartu kelas untuk masuk ke detail kelas dan fitur lainnya.

## ⚙️ Konfigurasi Komponen Nilai

Sebelum menginput nilai, dosen perlu mengatur komponen penilaian:
1. Buka halaman Konfigurasi dari dalam kelas.
2. Tambahkan komponen nilai seperti Tugas, UTS, UAS, Proyek, dan Kuis.
3. Pastikan total bobot = 100% sebelum menyimpan.
4. Validasi akan muncul bila ada kesalahan distribusi bobot.

## 📝 Input Nilai Mahasiswa

1. Masuk ke menu Input Nilai pada kelas tertentu.
2. Tabel mahasiswa akan tampil dengan baris-baris input sesuai komponen nilai.
3. Input nilai numerik per mahasiswa dan komponen.
4. Setelah selesai, klik tombol Simpan.

### 🛑 Validasi otomatis akan dilakukan:

- Nilai tidak boleh kosong.
- Nilai harus dalam rentang valid (misalnya 0-100).

## 📤 Ekspor Nilai

- Tersedia tombol untuk mengunduh nilai dalam format Excel.
- File ekspor akan berisi:
     - Nama Mahasiswa
     - NIM
     - Seluruh komponen nilai
     - Nilai akhir jika tersedia

## 📥 Impor Nilai

- Klik tombol Import Excel.
- Format Excel yang valid:

```bash
| NIM      | Tugas | UTS | UAS | ... |
|----------|-------|-----|-----|-----|
| 12345678 | 80    | 70  | 85  | ... |
```

- Validasi akan dilakukan dan hasil akan ditampilkan melalui popup animasi.

## 🧾 Riwayat & Feedback

- Notifikasi berhasil atau gagal akan ditampilkan menggunakan animasi popup (bukan SweetAlert).
- Komponen animasi dirancang ringan dan cepat untuk feedback UX yang optimal.

## 🛠️ Error Handling

- Error validasi akan ditampilkan inline pada form.
- Error sistem akan ditangkap dan ditampilkan dalam UI.

## 📌 Catatan Tambahan

- Aplikasi mendukung berbagai ukuran layar (responsive).
- Semua interaksi data menggunakan Context + Hooks.
- Semua form dilindungi oleh validasi schema untuk mencegah data tidak valid.