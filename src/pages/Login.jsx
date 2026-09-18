import { useState, useContext } from "react";
import { Mail, Lock, LogIn, UserPlus } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (!isLogin && !fullName)) {
      setError("Semua field wajib diisi");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        navigate("/");
      } else {
        await authAPI.register({ email, password, fullName });
        await login(email, password);
        navigate("/");
      }
    } catch (err) {
      if (err.response) {
        // Server responded with an error status
        setError(err.response.data?.message || "Terjadi kesalahan pada server");
      } else if (err.request) {
        // Request was made but no response received (backend not running)
        setError(
          "Tidak dapat terhubung ke server. Pastikan backend server sedang berjalan.",
        );
      } else {
        setError("Terjadi kesalahan: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-slate-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Perpustakaan Online
          </h1>
          <p className="text-slate-600">
            {isLogin ? "Masuk ke akun Anda" : "Buat akun baru"}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex mb-6 bg-slate-100 rounded-lg p-1">
          <button
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${isLogin ? "bg-white shadow text-blue-600" : "text-slate-500 hover:text-slate-700"}`}
            onClick={() => {
              setIsLogin(true);
              setError("");
            }}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${!isLogin ? "bg-white shadow text-blue-600" : "text-slate-500 hover:text-slate-700"}`}
            onClick={() => {
              setIsLogin(false);
              setError("");
            }}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label
                className="block text-slate-700 text-sm font-medium mb-2"
                htmlFor="fullName"
              >
                Nama Lengkap
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>
            </div>
          )}
          <div className="mb-4">
            <label
              className="block text-slate-700 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Masukkan email Anda"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block text-slate-700 text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Masukkan password Anda"
              />
            </div>
          </div>

          {error && (
            <div className="mb-4 text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md disabled:opacity-50"
          >
            {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
            <span>
              {loading ? "Processing..." : isLogin ? "Masuk" : "Daftar"}
            </span>
          </button>
        </form>

        {isLogin && (
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-sm text-slate-500 font-medium mb-3">
              Demo Credentials:
            </p>
            <div className="bg-slate-50 p-3 rounded-md text-xs font-mono text-slate-600 space-y-2">
              <div className="flex justify-between">
                <span>
                  Admin:{" "}
                  <span className="font-bold text-slate-800">
                    admin@example.com
                  </span>
                </span>
                <span>
                  pass:{" "}
                  <span className="font-bold text-slate-800">password123</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span>
                  User:{" "}
                  <span className="font-bold text-slate-800">
                    user@example.com
                  </span>
                </span>
                <span>
                  pass:{" "}
                  <span className="font-bold text-slate-800">password123</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
