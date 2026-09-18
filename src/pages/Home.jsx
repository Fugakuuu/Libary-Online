import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";
import ChatBot from "../components/ChatBot";
import { bookAPI } from "../services/api";
import { Search, BookOpen, Users, Star } from "lucide-react";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalBooks: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    fetchBooks();
  }, [searchTerm]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await bookAPI.getBooks({
        search: searchTerm,
        limit: 50,
      });
      setBooks(response.data.data);
      if (!searchTerm) {
        setStats({ totalBooks: response.data.pagination.total });
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div
          className={`bg-gradient-to-r from-white to-slate-50 rounded-2xl p-12 mb-16 border border-slate-200 shadow-xl transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
              Selamat Datang di Perpustakaan Online
            </h1>
            <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Temukan buku favorit Anda dengan mudah
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <BookOpen className="mx-auto mb-4 text-blue-600" size={40} />
              <div className="text-3xl font-bold text-slate-800 mb-2">
                {stats.totalBooks}
              </div>
              <div className="text-slate-500 font-medium">Koleksi Buku</div>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <Users className="mx-auto mb-4 text-indigo-600" size={40} />
              <div className="text-3xl font-bold text-slate-800 mb-2">2+</div>
              <div className="text-slate-500 font-medium">Anggota Aktif</div>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <Star className="mx-auto mb-4 text-purple-600" size={40} />
              <div className="text-3xl font-bold text-slate-800 mb-2">4.8</div>
              <div className="text-slate-500 font-medium">Rating</div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-slate-400" />
            <input
              type="text"
              placeholder="Cari berdasarkan judul atau penulis..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-16 pr-6 py-5 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-lg shadow-lg transition-all duration-300"
            />
          </div>
        </div>

        {/* Books Grid */}
        <div className="mb-20">
          <h2 className="text-4xl font-extrabold text-slate-800 mb-12 text-center bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
            Rekomendasi Buku
          </h2>

          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-slate-600">Memuat buku...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {books.map((book, index) => (
                  <div
                    key={book.id}
                    className={`transition-all duration-700 hover:scale-105 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                    style={{ transitionDelay: `${(index % 8) * 100}ms` }}
                  >
                    <BookCard book={book} />
                  </div>
                ))}
              </div>
              {books.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-slate-200 max-w-2xl mx-auto">
                  <div className="text-slate-600 text-xl mb-6">
                    Tidak ada buku yang ditemukan untuk "{searchTerm}"
                  </div>
                  <button
                    onClick={() => handleSearch("")}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Reset Pencarian
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <ChatBot />
    </div>
  );
};

export default Home;
