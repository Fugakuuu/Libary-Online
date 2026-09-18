# Perpustakaan Online (Library Online) - AI Prototype

Selamat datang di repositori **Perpustakaan Online**, sebuah prototipe aplikasi perpustakaan modern berbasis web yang dibangun dengan antarmuka yang dinamis, menarik, dan interaktif. Proyek ini dilengkapi dengan integrasi asisten cerdas (AI Chatbot) untuk membantu pengunjung menemukan buku yang mereka cari.

## Fitur dan Sistem Utama

Aplikasi ini memiliki beberapa sistem dan fitur yang telah diimplementasikan:

### 1. Sistem Autentikasi (Login)

- Halaman login yang modern dan responsif.
- Validasi form di sisi klien (Client-side validation):
- Umpan balik error (Error feedback) visual jika data tidak sesuai.

### 2. Halaman Beranda (Home / Dashboard)

- **Hero Section & Statistik:** Menampilkan ucapan selamat datang beserta statistik perpustakaan seperti total koleksi buku, jumlah anggota aktif, dan rating perpustakaan secara visual.
- **Sistem Pencarian Buku (Search Engine):**
  - Pengguna dapat mencari buku berdasarkan **Judul** atau **Nama Penulis** secara real-time.
  - Jika buku tidak ditemukan, sistem akan memberikan notifikasi dan tombol untuk mereset pencarian.
- **Katalog Buku:** Menampilkan daftar rekomendasi buku menggunakan desain `BookCard` yang rapi dan terstruktur dalam bentuk grid. Data buku saat ini menggunakan _mock data_ statis.
- **Animasi & Transisi:** Dilengkapi efek kemunculan elemen yang halus ketika halaman pertama kali dimuat (fade-in, transform).

### 3. Sistem Chatbot AI (Voiceflow Integration)

- Aplikasi ini terintegrasi dengan **Voiceflow**, sebuah platform AI conversational.
- Terdapat widget chatbot mengambang di halaman beranda yang siap membantu pengguna menavigasi informasi atau sekadar berinteraksi.
- Modul ini ditangani secara modular di komponen `ChatBot.jsx`.

## Teknologi yang Digunakan

Proyek ini menggunakan teknologi web modern untuk memastikan performa yang cepat dan pengalaman pengguna yang maksimal:

- **Frontend Framework:** [React](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/) - Memberikan waktu build dan Fast Refresh yang sangat cepat.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) - (Berdasarkan penggunaan kelas-kelas utility di JSX).
- **Icons:** [Lucide React](https://lucide.dev/) - Untuk ikon-ikon antarmuka seperti pencarian, pengguna, dll.
- **Chatbot Integrasi:** [Voiceflow Widget](https://www.voiceflow.com/)

## Struktur Folder

```text
/
├── public/              # Aset statis (gambar, ikon)
├── src/                 # Kode sumber utama
│   ├── components/      # Komponen UI Reusable
│   │   ├── BookCard.jsx # Komponen tampilan kartu buku
│   │   ├── ChatBot.jsx  # Integrasi widget Voiceflow AI
│   │   └── Navbar.jsx   # Navigasi utama
│   ├── data/            # Data dummy untuk development
│   │   └── mockData.js
│   ├── pages/           # Halaman utama aplikasi
│   │   ├── Home.jsx     # Halaman Dashboard / Beranda
│   │   └── Login.jsx    # Halaman Autentikasi
│   ├── App.jsx          # Komponen Root
│   ├── index.css        # Styling Global (Tailwind base)
│   └── main.jsx         # Entry point React
└── ... file konfigurasi (package.json, vite.config.js, dll)
```

## Cara Menjalankan Proyek Secara Lokal

Jika Anda ingin menjalankan proyek ini di komputer Anda sendiri, ikuti langkah-langkah berikut:

1. **Clone repository ini** (jika ada di platform git) atau ekstrak folder proyek.
2. Buka terminal dan arahkan ke direktori root proyek ini.
3. Jalankan perintah berikut untuk menginstal semua dependensi:
   ```bash
   npm install
   ```
4. Setelah instalasi selesai, jalankan server pengembangan lokal:
   ```bash
   npm run dev
   ```
5. Buka tautan lokal yang muncul di terminal (biasanya `http://localhost:5173/`) pada browser Anda.

---

_Proyek ini dikembangkan sebagai prototipe interaksi manusia-komputer dengan memanfaatkan teknologi AI._
