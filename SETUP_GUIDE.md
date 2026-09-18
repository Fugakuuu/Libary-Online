# 📚 Perpustakaan Online - Database & Authentication Setup

Panduan lengkap untuk mengintegrasikan database authentication dengan role-based access control (Admin & User).

## 📋 Daftar Isi

1. [Backend Setup](#backend-setup)
2. [Database Configuration](#database-configuration)
3. [Frontend Integration](#frontend-integration)
4. [API Documentation](#api-documentation)
5. [Testing](#testing)

---

## 🚀 Backend Setup

### Prerequisites

- Node.js (v14 atau lebih tinggi)
- npm atau yarn
- PostgreSQL (untuk production) atau SQLite (untuk development)

### 1. Install Dependencies

```bash
cd perpustakaan-backend
npm install
```

### 2. Setup Environment Variables

Copy `.env.example` ke `.env`:

```bash
cp .env.example .env
```

Edit `.env` sesuai konfigurasi Anda:

**Untuk Development (SQLite):**

```env
NODE_ENV=development
PORT=5000
DB_TYPE=sqlite
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

**Untuk Production (PostgreSQL):**

```env
NODE_ENV=production
PORT=5000
DB_TYPE=postgres
DB_NAME=perpustakaan_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d
FRONTEND_URL=https://yourdomain.com
```

### 3. Jalankan Server

```bash
# Development (dengan auto-reload)
npm run dev

# Production
npm start
```

Server akan berjalan di `http://localhost:5000`

---

## 🗄️ Database Configuration

### Struktur Database

#### Users Table

```sql
- id (UUID Primary Key)
- email (String, Unique)
- password (String, Hashed)
- fullName (String)
- role (Enum: 'user' | 'admin')
- profilePicture (String, Optional)
- bio (Text, Optional)
- isActive (Boolean)
- createdAt (DateTime)
- updatedAt (DateTime)
```

#### Books Table

```sql
- id (UUID Primary Key)
- title (String)
- author (String)
- description (Text, Optional)
- coverImage (String, Optional)
- isbn (String, Unique, Optional)
- publisher (String, Optional)
- publishedYear (Integer, Optional)
- category (String, Optional)
- pages (Integer, Optional)
- language (String)
- rating (Float, 0-5)
- availability (Integer) - jumlah buku tersedia
- addedBy (UUID Foreign Key -> Users.id)
- createdAt (DateTime)
- updatedAt (DateTime)
```

### Relasi Database

- **Users** : **Books** = 1 : Many
  - Satu user (admin) dapat menambahkan banyak buku
  - Setiap buku hanya ditambahkan oleh satu admin

---

## 🔐 Authentication System

### User Roles

#### 🤴 Admin

- Dapat login
- Dapat menambah buku baru
- Dapat edit buku yang ditambahkan
- Dapat hapus buku yang ditambahkan
- Dapat melihat statistics

#### 👤 User (Pengunjung)

- Dapat register
- Dapat login
- Dapat melihat katalog buku
- Dapat search buku
- TIDAK dapat menambah/edit/hapus buku

### JWT Token

- Format: `Bearer {token}`
- Expiration: 7 hari (configurable)
- Stored in: `localStorage`

---

## 💻 Frontend Integration

### 1. Install Dependencies

```bash
cd perpustakaan-frontend
npm install axios react-router-dom
```

### 2. Setup Environment Variables

Create `.env.local`:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. File Structure

```
src/
├── components/
│   ├── ProtectedRoute.jsx      # Protected route component
│   ├── Navbar.jsx              # Updated with logout
│   ├── BookCard.jsx
│   └── ChatBot.jsx
├── context/
│   └── AuthContext.jsx         # Auth state management
├── pages/
│   ├── Login.jsx               # Updated dengan backend integration
│   ├── Home.jsx                # Updated untuk fetch dari database
│   └── AdminPanel.jsx          # NEW - Admin panel untuk tambah buku
├── services/
│   └── api.js                  # API client dengan Axios
└── App.jsx                     # Updated dengan routes
```

### 4. Update App.jsx

```jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminPanel from "./pages/AdminPanel";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            element={
              <>
                <Navbar />
              </>
            }
          >
            <Route path="/" element={<Home />} />
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
```

### 5. Update Home.jsx (Fetch dari Database)

```jsx
import { useEffect, useState } from "react";
import { bookAPI } from "../services/api";
import BookCard from "../components/BookCard";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadBooks();
  }, [search]);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const response = await bookAPI.getBooks({
        search,
        limit: 20,
      });
      setBooks(response.data.data);
    } catch (error) {
      console.error("Failed to load books:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Search bar */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search books..."
      />

      {/* Books grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
```

---

## 📡 API Documentation

### Authentication Endpoints

#### Register

```
POST /api/auth/register
Body: {
  email: string,
  password: string (min 6 chars),
  fullName: string,
  role: 'user' | 'admin' (optional, default: 'user')
}
Response: {
  token: string,
  user: { id, email, fullName, role, ... }
}
```

#### Login

```
POST /api/auth/login
Body: {
  email: string,
  password: string
}
Response: {
  token: string,
  user: { id, email, fullName, role, ... }
}
```

#### Get Current User

```
GET /api/auth/me
Headers: Authorization: Bearer {token}
Response: {
  user: { id, email, fullName, role, ... }
}
```

#### Update Profile

```
PUT /api/auth/profile
Headers: Authorization: Bearer {token}
Body: {
  fullName: string (optional),
  bio: string (optional),
  profilePicture: string (optional)
}
```

### Book Endpoints

#### Get All Books

```
GET /api/books?page=1&limit=10&search=&category=&author=
Response: {
  data: [...],
  pagination: { total, pages, currentPage, limit }
}
```

#### Get Book by ID

```
GET /api/books/:id
Response: {
  data: { id, title, author, ... }
}
```

#### Create Book (Admin Only)

```
POST /api/books
Headers: Authorization: Bearer {token}
Body: {
  title: string,
  author: string,
  description: string (optional),
  coverImage: string (optional),
  isbn: string (optional, unique),
  publisher: string (optional),
  publishedYear: number (optional),
  category: string (optional),
  pages: number (optional),
  language: string (default: 'Indonesian'),
  availability: number (default: 1)
}
```

#### Update Book (Admin Only)

```
PUT /api/books/:id
Headers: Authorization: Bearer {token}
Body: { ...same as create, semua optional }
```

#### Delete Book (Admin Only)

```
DELETE /api/books/:id
Headers: Authorization: Bearer {token}
```

#### Get Book Statistics (Admin Only)

```
GET /api/books/admin/stats
Headers: Authorization: Bearer {token}
Response: {
  totalBooks: number,
  booksAddedByMe: number,
  uniqueCategories: number
}
```

### User Endpoints (Admin Only)

#### Get All Users

```
GET /api/users?page=1&limit=10
Headers: Authorization: Bearer {token}
Response: { data: [...], pagination: {...} }
```

#### Update User Role

```
PUT /api/users/:id/role
Headers: Authorization: Bearer {token}
Body: { role: 'user' | 'admin' }
```

#### Update User Status

```
PUT /api/users/:id/status
Headers: Authorization: Bearer {token}
Body: { isActive: boolean }
```

---

## 🧪 Testing

### Demo Credentials

Gunakan credentials ini untuk testing (setelah backend dijalankan):

**Admin Account:**

```
Email: admin@example.com
Password: password123
```

**User Account:**

```
Email: user@example.com
Password: password123
```

Untuk membuat akun ini secara otomatis, Anda bisa menambahkan seed script.

### Testing Flow

1. **Register sebagai User**
   - Buka http://localhost:5173/login
   - Klik "Register"
   - Isi form (email, password, fullname)
   - Akan langsung login dan redirect ke home

2. **Login sebagai User**
   - Lihat katalog buku
   - Search buku
   - TIDAK bisa menambah buku (tombol tidak terlihat)

3. **Login sebagai Admin**
   - Lihat katalog buku
   - Akses `/admin` untuk panel admin
   - Dapat menambah buku baru
   - Dapat edit/delete buku yang ditambahkan
   - Lihat statistics

---

## ⚙️ Configuration Options

### Database

- **Development:** SQLite (automatic, file: `database.sqlite`)
- **Production:** PostgreSQL (configurable via .env)

### JWT

- Default expiration: 7 hari
- Dapat diubah via `JWT_EXPIRE` di .env

### CORS

- Automatic untuk `FRONTEND_URL` di .env

---

## 🔍 Troubleshooting

### Port already in use

```bash
# Ganti PORT di .env atau kill process yang menggunakan port
lsof -i :5000
kill -9 <PID>
```

### Database connection error

```bash
# Pastikan PostgreSQL berjalan (untuk production)
# Atau hapus database.sqlite jika menggunakan SQLite (untuk dev)
rm database.sqlite
```

### Token invalid

- Pastikan token disimpan di localStorage dengan key `token`
- Pastikan `JWT_SECRET` sama di backend dan settings

### CORS Error

- Update `FRONTEND_URL` di .env backend
- Ensure frontend URL matches exactly

---

## 📚 Additional Resources

- [Sequelize ORM Documentation](https://sequelize.org/)
- [Express.js Documentation](https://expressjs.com/)
- [JWT Documentation](https://jwt.io/)
- [React Router Documentation](https://reactrouter.com/)

---

**Happy Coding! 🚀**
