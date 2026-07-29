import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SuperAdminLogin() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        password: "",
        rememberMe: false
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!form.username || !form.password) {
            setError("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/super-admin/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: form.username,
                    password: form.password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("superAdminToken", data.access);
                localStorage.setItem("superAdminRefresh", data.refresh);
                localStorage.setItem("superAdminData", JSON.stringify(data.user));

                if (form.rememberMe) {
                    localStorage.setItem("rememberMe", "true");
                }

                navigate("/super-admin/dashboard");
            } else {
                setError(data.error || "Invalid credentials. Please try again.");
            }
        } catch (err) {
            setError("Server error. Please check your connection.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 p-4 relative overflow-hidden">

            {/* Background Pattern - Islamic Geometric */}
            <div className="absolute inset-0 opacity-[0.03]">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="islamicPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                            <path d="M40 0 L80 40 L40 80 L0 40 Z" fill="none" stroke="#065f46" strokeWidth="0.5" />
                            <circle cx="40" cy="40" r="20" fill="none" stroke="#065f46" strokeWidth="0.5" />
                            <path d="M20 20 L60 60 M20 60 L60 20" stroke="#065f46" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#islamicPattern)" />
                </svg>
            </div>

            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/10 rounded-full blur-3xl" />

            {/* Main Container */}
            <div className="relative z-10 w-full max-w-md">

                {/* Back to Login Link */}
                <button
                    onClick={() => navigate("/login")}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors mb-8 group"
                >
                    <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Back to Login</span>
                </button>

                {/* Logo & Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl shadow-2xl shadow-emerald-500/20 mb-4 relative">
                        <span className="text-4xl text-white drop-shadow-sm">☾</span>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">★</div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                        Super Admin
                    </h2>
                    <p className="text-xs text-gray-400 font-light mt-1">
                        Owner Access Only – Restricted Area
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100/60 p-8">

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 rounded-xl border border-red-100">
                            <p className="text-sm text-red-600 text-center">{error}</p>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Username Field */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                                Username
                            </label>
                            <input
                                type="text"
                                placeholder="Username"
                                value={form.username}
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className="w-full px-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    )}
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
                                "Login as Owner"
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer Links */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-400">
                        <button
                            onClick={() => navigate("/login")}
                            className="hover:text-emerald-600 transition-colors"
                        >
                            Member Login
                        </button>
                        <span className="mx-2 text-gray-300">•</span>
                        <button
                            onClick={() => navigate("/register")}
                            className="hover:text-emerald-600 transition-colors"
                        >
                            Register Mosque
                        </button>
                        <span className="mx-2 text-gray-300">•</span>
                        <button className="hover:text-emerald-600 transition-colors">
                            Forgot Password?
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}