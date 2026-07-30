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

  // 🔍 CHECK USER TYPE (First Login check on blur)
  const checkUser = async (identifier) => {
    if (!identifier || !identifier.trim()) return;
    try {
      const res = await fetch("http://127.0.0.1:8000/api/members/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: identifier.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.first_login) {
        setMemberId(data.id || data.member_id);
      } else {
        setMemberId(null);
      }
    } catch (err) {
      console.log("Check user error:", err);
    }
  };

  // 🔐 LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const identifierValue = (form.username || form.member_id || "").trim();

    if (!identifierValue) {
      setError("Please enter your Phone, Member ID, or Name");
      setIsLoading(false);
      return;
    }

    let responseData = null;

    try {
      // 👤 1. MEMBER LOGIN FIRST
      const memberRes = await fetch(
        "http://127.0.0.1:8000/api/members/login/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identifier: identifierValue,
            password: form.password,
          }),
        }
      );
      responseData = await memberRes.json();

      if (memberRes.ok) {
        if (responseData.first_login) {
          setMemberId(responseData.id || responseData.member_id);
          return;
        }

        if (responseData.id || responseData.member_id) {
          const memberData = {
            ...responseData,
            id: responseData.id || responseData.member_id,
          };
          localStorage.setItem("member", JSON.stringify(memberData));
          navigate("/member-profile");
          return;
        }
      }

      // 🔐 2. IF MEMBER NOT FOUND, TRY ADMIN LOGIN FALLBACK
      if (memberRes.status === 404) {
        try {
          const adminRes = await fetch("http://127.0.0.1:8000/api/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: identifierValue,
              password: form.password,
            }),
          });

          if (adminRes.ok) {
            const adminData = await adminRes.json();
            if (adminData.access) {
              localStorage.setItem("token", adminData.access);
              navigate("/dashboard");
              return;
            }
          }
        } catch (err) {
          // Admin endpoint error
        }
      }

      setError(responseData?.error || "Login failed. Please check your credentials.");
    } catch (err) {
      console.error("Login catch error:", err);
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
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/members/set-password/${memberId}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Password created successfully! Please login with your new password.");
        setMemberId(null);
        setNewPassword("");
        setForm({ ...form, password: "" });
      } else {
        setError(data.error || "Failed to set password");
      }
    } catch (err) {
      console.error("Create password error:", err);
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
              : "Login to your mosque dashboard or member profile"
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

              {/* Identifier Field (Phone / Member ID / Name) */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                  Phone / Member ID / Name
                </label>
                <input
                  type="text"
                  placeholder="Enter phone, member ID (e.g. MAS0001), or name"
                  value={form.username}
                  onChange={(e) => {
                    setForm({ ...form, username: e.target.value });
                    setError("");
                  }}
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
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={(e) => {
                      setForm({ ...form, password: e.target.value });
                      setError("");
                    }}
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
                <p className="text-xs text-emerald-800 font-medium">
                  🔐 First time logging in! Set your new password below.
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
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setError("");
                  }}
                  className="w-full px-4 py-3 bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={createPassword}
                  disabled={isLoading}
                  className="flex-1 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                <button
                  type="button"
                  onClick={() => setMemberId(null)}
                  className="px-4 py-3.5 bg-gray-100 text-gray-600 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200/60"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-slate-50 text-gray-400 font-medium tracking-wider rounded-full">
              OR CONTINUE WITH
            </span>
          </div>
        </div>

        {/* Admin Login Option */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => navigate("/admin-login")}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-xl hover:border-emerald-300 hover:bg-white/80 transition-all duration-300 group"
          >
            <span className="text-gray-400 group-hover:text-emerald-500 transition-colors">🏛️</span>
            <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors font-medium">
              Admin Login
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}