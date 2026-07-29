import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [memberId, setMemberId] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // 🔍 CHECK USER TYPE
  const checkUser = async (username) => {
    if (!username) return;
    try {
      const res = await fetch("http://127.0.0.1:8000/api/members/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (data.first_login) {
        setMemberId(data.id);
      } else {
        setMemberId(null);
      }
    } catch {
      console.log("Check user error");
    }
  };

  // 🔐 LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // 🔐 1. ADMIN LOGIN
      const adminRes = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const adminData = await adminRes.json();

      if (adminData.access) {
        localStorage.setItem("token", adminData.access);
        navigate("/dashboard");
        setIsLoading(false);
        return;
      }

      // 👤 2. MEMBER LOGIN
      const memberRes = await fetch(
        "http://127.0.0.1:8000/api/members/login/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await memberRes.json();

      if (data.first_login) {
        setMemberId(data.id);
        setIsLoading(false);
        return;
      }

      if (data.id) {
        localStorage.setItem("member", JSON.stringify(data));
        navigate("/member-profile");
        setIsLoading(false);
        return;
      }

      setError(data.error || "Login failed");
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔐 CREATE PASSWORD
  const createPassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setIsLoading(true);
    try {
      await fetch(`http://127.0.0.1:8000/api/members/set-password/${memberId}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });
      alert("Password created successfully! Please login.");
      setMemberId(null);
      setNewPassword("");
      setForm({ ...form, password: "" });
    } catch {
      setError("Failed to set password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 p-4 relative overflow-hidden">

      {/* Background Decorative Elements */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-20 w-72 h-72 bg-blue-200/15 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-100/10 rounded-full blur-3xl" />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md">

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl shadow-xl shadow-emerald-500/20 mb-4">
            <span className="text-3xl text-white drop-shadow-sm">☾</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            {memberId ? "Create Password" : "Welcome back"}
          </h2>
          <p className="text-sm text-gray-400 font-light mt-1">
            {memberId
              ? "First time login – create your password"
              : "Login to your mosque dashboard"
            }
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100/60 p-8">

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50/80 backdrop-blur-sm rounded-xl border border-red-100">
              <p className="text-sm text-red-600 text-center">{error}</p>
            </div>
          )}

          {/* 🔐 LOGIN FORM */}
          {!memberId && (
            <form onSubmit={handleLogin} className="space-y-4">

              {/* Email/Phone Field */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                  Email / Phone
                </label>
                <input
                  type="text"
                  placeholder="Enter email or phone number"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  onBlur={(e) => checkUser(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Logging in...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          )}

          {/* 🔥 CREATE PASSWORD UI */}
          {memberId && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50/50 backdrop-blur-sm rounded-xl border border-emerald-100/50 text-center">
                <p className="text-xs text-gray-500">
                  🔐 Set your password to complete registration
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                  Create New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password (min 6 chars)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
                />
              </div>

              <button
                onClick={createPassword}
                disabled={isLoading}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating...</span>
                  </div>
                ) : (
                  "Create Password"
                )}
              </button>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200/60"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-transparent text-gray-400 font-medium tracking-wider">
              OR CONTINUE WITH
            </span>
          </div>
        </div>

        {/* Guest & Owner Options */}
        <div className="space-y-3">


          <button
            onClick={() => navigate("/admin-login")}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-xl hover:border-emerald-300 hover:bg-white/80 transition-all duration-300 group"
          >
            <span className="text-gray-400 group-hover:text-emerald-500 transition-colors">🏛️</span>
            <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
              Admin Login
            </span>
          </button>
        </div>

        {/* Register Link */}

      </div>
    </div>
  );
}