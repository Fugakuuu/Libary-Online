# 🚀 Quick Start Guide

Panduan cepat untuk setup dan menjalankan Perpustakaan Online dengan database authentication.

## ⏱️ 5 Menit Setup

### Step 1: Setup Backend (2 menit)

```bash
cd perpustakaan-backend

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Create demo data
node seed.js
```

**Output yang diharapkan:**

```
✅ Database synced
✅ Admin user created: admin@example.com
✅ Regular user created: user@example.com
✅ 8 sample books created
🎉 Database seeding completed successfully!
```

### Step 2: Run Backend Server

```bash
npm run dev
```

**Server akan berjalan di:** `http://localhost:5000`

✅ Jika berhasil, Anda akan melihat:

```
🚀 Server running on http://localhost:5000
```

### Step 3: Setup Frontend (2 menit)

Buka terminal baru:

```bash
cd perpustakaan-frontend

# Install dependencies
npm install

# Update API URL
echo "VITE_API_URL=http://localhost:5000/api" > .env.local

# Run dev server
npm run dev
```

**Frontend akan berjalan di:** `http://localhost:5173`

✅ Jika berhasil, Anda akan melihat:

```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

---

## 🧪 Testing

### 1️⃣ Login sebagai User

1. Buka http://localhost:5173/login
2. Klik tab "Login"
3. Gunakan credentials:
   - **Email:** `user@example.com`
   - **Password:** `password123`
4. Klik "Login"

✅ Anda akan redirect ke home page dan bisa:

- Melihat katalog buku dari database
- Search buku
- TIDAK bisa menambah buku (tombol admin tersembunyi)

### 2️⃣ Login sebagai Admin

1. Buka http://localhost:5173/login
2. Klik tab "Login"
3. Gunakan credentials:
   - **Email:** `admin@example.com`
   - **Password:** `password123`
4. Klik "Login"

✅ Anda akan redirect ke home page. Sekarang bisa:

- Akses Admin Panel di menu navbar atau langsung: http://localhost:5173/admin
- **Lihat Statistics:** Total books, books added by you, categories
- **Add New Book:** Tombol "Add New Book" di admin panel
- **Edit Book:** Klik tombol edit (✏️) pada buku apapun
- **Delete Book:** Klik tombol delete (🗑️) untuk hapus buku

### 3️⃣ Test Add Book

1. Login sebagai admin
2. Akses http://localhost:5173/admin
3. Klik "Add New Book"
4. Isi form:
   - **Title:** "Clean Code"
   - **Author:** "Robert C. Martin"
   - **Category:** "Technology"
   - **Pages:** "464"
   - **(Optional) Cover Image:** https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&q=80
5. Klik "Add Book"

✅ Buku baru akan muncul di:

- Admin panel table
- Home page catalog
- Statistics akan update

### 4️⃣ Test Search

1. Go to Home Page
2. Gunakan search bar untuk cari buku:
   - Search by title: "Great" → finds "The Great Gatsby"
   - Search by author: "Lee" → finds "To Kill a Mockingbird" by Harper Lee

---

## 📊 Demo Database

### Admin Account

```
Email: admin@example.com
Password: password123
Role: admin
```

**Permissions:**

- ✅ Add books
- ✅ Edit/delete books
- ✅ View statistics
- ✅ Access admin panel

### User Account

```
Email: user@example.com
Password: password123
Role: user
```

**Permissions:**

- ✅ Browse books
- ✅ Search books
- ❌ Add/edit/delete books
- ❌ Access admin panel

### Pre-loaded Books (8 books)

1. The Great Gatsby - F. Scott Fitzgerald
2. To Kill a Mockingbird - Harper Lee
3. 1984 - George Orwell
4. Sapiens - Yuval Noah Harari
5. Atomic Habits - James Clear
6. The Catcher in the Rye - J.D. Salinger
7. Pride and Prejudice - Jane Austen
8. The Art of War - Sun Tzu

---

## 🔧 Troubleshooting

### Frontend tidak bisa connect ke backend?

**Error:** `localhost:5000 refused to connect`

**Solution:**

1. Pastikan backend server running (`npm run dev` di folder backend)
2. Check PORT: backend harus berjalan di port 5000
3. Verify `.env.local` di frontend: `VITE_API_URL=http://localhost:5000/api`

### Database error?

**Error:** `database.sqlite not found` atau database connection failed

**Solution:**

```bash
cd perpustakaan-backend
node seed.js  # Ini akan create database + seed data
```

### Login gagal?

**Error:** "Invalid email or password"

**Solution:**

1. Pastikan credentials benar:
   - Admin: `admin@example.com` / `password123`
   - User: `user@example.com` / `password123`
2. Pastikan database sudah di-seed: `node seed.js`
3. Clear browser cache & localStorage: `localStorage.clear()`

### Token expired?

**Error:** 401 Unauthorized, atau auto redirect ke login

**Solution:**

- Token expires setelah 7 hari
- Untuk development, update `.env` backend: `JWT_EXPIRE=30d`
- Atau login lagi

---

## 📂 File Structure Reference

```
perpustakaan-backend/
├── server.js                    ← Entry point
├── package.json
├── .env.example
├── seed.js                      ← Run this untuk create demo data
├── config/database.js
├── models/User.js, Book.js
├── controllers/authController.js, bookController.js
├── middleware/auth.js
└── routes/auth.js, books.js, users.js

perpustakaan-frontend/
├── src/
│   ├── services/api.js          ← API client
│   ├── context/AuthContext.jsx  ← Auth state
│   ├── components/ProtectedRoute.jsx
│   └── pages/
│       ├── Login.jsx            ← Updated
│       └── AdminPanel.jsx       ← NEW
└── .env.local                   ← Create this with API URL
```

---

## 🎯 Next Steps

### Immediate

- [ ] Test login dengan admin & user accounts
- [ ] Test add book di admin panel
- [ ] Test search functionality
- [ ] Test protected routes

### Short-term

- [ ] Update Navbar untuk show current user
- [ ] Add logout button
- [ ] Update Home.jsx untuk fetch books dari database
- [ ] Add more demo users

### Long-term (Optional)

- [ ] Email verification
- [ ] Password reset
- [ ] Book borrowing system
- [ ] User ratings/reviews
- [ ] Wishlist feature
- [ ] Upload cover images

---

## 📚 API Endpoints Quick Reference

### Auth

```
POST /api/auth/register      → Create account
POST /api/auth/login         → Login & get token
GET  /api/auth/me            → Get current user
PUT  /api/auth/profile       → Update profile
```

### Books (Public)

```
GET /api/books               → Get all books
GET /api/books?search=X      → Search books
GET /api/books/:id           → Get book details
```

### Books (Admin only)

```
POST   /api/books            → Create book
PUT    /api/books/:id        → Update book
DELETE /api/books/:id        → Delete book
GET    /api/books/admin/stats → Get statistics
```

---

## 🔐 Security Features

✅ Password hashing (bcrypt)
✅ JWT authentication
✅ Role-based access control
✅ Protected API routes
✅ Token expiration
✅ Input validation
✅ CORS protection

---

## 📞 Support

Jika ada masalah:

1. **Check terminal output** - error messages sering memberikan hint
2. **Clear cache** - refresh browser, clear localStorage
3. **Restart servers** - sometimes a fresh start fixes it
4. **Check .env files** - pastikan credentials & URLs benar
5. **Re-seed database** - `node seed.js`

---

## ✅ Success Checklist

- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] Can login dengan admin@example.com
- [ ] Can login dengan user@example.com
- [ ] Admin dapat add books
- [ ] User TIDAK dapat add books
- [ ] Can search books di home page
- [ ] Can see admin statistics
- [ ] Can edit dan delete books (admin only)

Selamat! Anda sudah berhasil setup Perpustakaan Online dengan database authentication! 🎉

---

**Lebih detail?** Baca `SETUP_GUIDE.md` dan `IMPLEMENTATION_SUMMARY.md`
