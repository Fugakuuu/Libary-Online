import React, { useState, useEffect } from "react";
import { bookAPI } from "../services/api";
import Navbar from "../components/Navbar";

const AdminPanel = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    booksAddedByMe: 0,
    uniqueCategories: 0,
  });
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    pages: "",
    description: "",
    coverImage: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const statsRes = await bookAPI.getStats();
      setStats(statsRes.data);

      const booksRes = await bookAPI.getBooks({ limit: 100 });
      setBooks(booksRes.data.data);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookAPI.createBook(formData);
      setShowForm(false);
      setFormData({
        title: "",
        author: "",
        category: "",
        pages: "",
        description: "",
        coverImage: "",
      });
      loadData();
    } catch (error) {
      console.error("Failed to create book:", error);
      alert("Failed to create book");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await bookAPI.deleteBook(id);
        loadData();
      } catch (error) {
        console.error("Failed to delete book:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow border border-slate-200">
            <h3 className="text-slate-500 font-medium">Total Books</h3>
            <p className="text-3xl font-bold mt-2">{stats.totalBooks}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border border-slate-200">
            <h3 className="text-slate-500 font-medium">Books Added By Me</h3>
            <p className="text-3xl font-bold mt-2">{stats.booksAddedByMe}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border border-slate-200">
            <h3 className="text-slate-500 font-medium">Categories</h3>
            <p className="text-3xl font-bold mt-2">{stats.uniqueCategories}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Manage Books</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {showForm ? "Cancel" : "Add New Book"}
          </button>
        </div>

        {/* Add Book Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-xl shadow mb-8">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Author</label>
                <input
                  required
                  type="text"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                >
                  <option value="" disabled>
                    Pilih Kategori
                  </option>
                  <option value="Fiksi">Fiksi</option>
                  <option value="Non-Fiksi">Non-Fiksi</option>
                  <option value="Sains & Teknologi">Sains & Teknologi</option>
                  <option value="Sejarah">Sejarah</option>
                  <option value="Biografi">Biografi</option>
                  <option value="Fantasi">Fantasi</option>
                  <option value="Misteri">Misteri</option>
                  <option value="Romantis">Romantis</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Anak-anak">Anak-anak</option>
                  <option value="Pengembangan Diri">Pengembangan Diri</option>
                  <option value="Bisnis & Ekonomi">Bisnis & Ekonomi</option>
                  <option value="Agama & Spiritualitas">
                    Agama & Spiritualitas
                  </option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Description / Synopsis
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full border p-2 rounded h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pages</label>
                <input
                  type="number"
                  value={formData.pages}
                  onChange={(e) =>
                    setFormData({ ...formData, pages: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={formData.coverImage}
                  onChange={(e) =>
                    setFormData({ ...formData, coverImage: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                >
                  Save Book
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Books Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Author</th>
                <th className="p-4">Category</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} className="border-b">
                  <td className="p-4 font-medium">{book.title}</td>
                  <td className="p-4">{book.author}</td>
                  <td className="p-4">{book.category}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
