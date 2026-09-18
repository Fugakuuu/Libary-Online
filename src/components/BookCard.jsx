import { useState } from "react";
import { BookOpen, X } from "lucide-react";

const BookCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
        <div className="relative overflow-hidden">
          <img
            src={book.coverImage || "https://via.placeholder.com/400x600"}
            alt={book.title}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300"></div>
        </div>
        <div className="p-6">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
            {book.category}
          </span>
          <h3 className="mt-3 text-lg font-semibold text-gray-900 line-clamp-2">
            {book.title}
          </h3>
          <p className="text-gray-600 mt-1">{book.author}</p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <BookOpen size={18} />
            <span>Sinopsis</span>
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-white/10 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">{book.title}</h2>
            <p className="text-gray-700 leading-relaxed">{book.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default BookCard;
