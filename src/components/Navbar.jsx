import { BookOpen, Menu, X, User as UserIcon, LogOut } from "lucide-react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-linear-to-r from-blue-600 to-indigo-600 text-white p-4 shadow-lg border-b border-slate-200/20">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <BookOpen size={28} className="text-blue-200" />
          <span className="text-2xl font-bold">Perpustakaan Online</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="hover:text-blue-200 transition-colors font-medium"
          >
            Home
          </Link>
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="hover:text-blue-200 transition-colors font-medium"
            >
              Admin Panel
            </Link>
          )}
          {user && (
            <div className="flex items-center space-x-4 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <span className="font-medium">{user.fullName}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-red-200 hover:text-red-300 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-blue-200 transition-colors duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-slate-200/30 bg-white/10 rounded-lg backdrop-blur-sm">
          <div className="flex flex-col space-y-3 pt-4 px-4">
            <Link
              to="/"
              className="hover:text-blue-200 transition-colors duration-300 py-2 font-medium"
            >
              Home
            </Link>
            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="hover:text-blue-200 transition-colors duration-300 py-2 font-medium"
              >
                Admin Panel
              </Link>
            )}
            {user && (
              <div className="border-t border-slate-200/20 pt-3 mt-3">
                <div className="py-2 text-blue-100">Halo, {user.fullName}</div>
                <button
                  onClick={handleLogout}
                  className="text-left w-full hover:text-red-300 text-red-200 transition-colors duration-300 py-2 font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
