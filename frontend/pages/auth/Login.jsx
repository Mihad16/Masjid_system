import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });

  const [memberId, setMemberId] = useState(null); // first login
  const [newPassword, setNewPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 🔍 CHECK USER TYPE
  const checkUser = async (username) => {
    if (!username) return;

    try {
      const res = await fetch("http://127.0.0.1:8000/api/members/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();

      if (data.first_login) {
        setMemberId(data.id); // new member
      } else {
        setMemberId(null); // existing member
      }

    } catch {
      console.log("Check user error");
    }
  };

  // 🔐 LOGIN
 const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    // 🔐 1. ADMIN LOGIN
    const adminRes = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const adminData = await adminRes.json();
    console.log("ADMIN RESPONSE:", adminData);

    // ✅ ADMIN SUCCESS
    if (adminData.access) {
      localStorage.setItem("token", adminData.access);
      navigate("/dashboard");
      return;
    }

    // 👤 2. MEMBER LOGIN (YOU MISSED THIS)
    const memberRes = await fetch(
      "http://127.0.0.1:8000/api/members/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const data = await memberRes.json(); // ✅ NOW data exists
    console.log("MEMBER RESPONSE:", data);

    // 🔥 FIRST LOGIN
    if (data.first_login) {
      setMemberId(data.id);
      return;
    }

    // ✅ MEMBER SUCCESS
    if (data.id) {
      localStorage.setItem("member", JSON.stringify(data));
      navigate("/member-profile");
      return;
    }

    // ❌ ERROR
    setError(data.error || "Login failed");

  } catch (err) {
    console.log(err);
    setError("Server error");
  }
};

  // 🔐 CREATE PASSWORD
  const createPassword = async () => {
    if (!newPassword) {
      setError("Enter new password");
      return;
    }

    try {
      await fetch(
        `http://127.0.0.1:8000/api/members/set-password/${memberId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: newPassword }),
        }
      );

      alert("Password created! Please login.");

      setMemberId(null);
      setNewPassword("");

    } catch {
      setError("Failed to set password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-6 rounded shadow w-80">

        <h2 className="text-lg font-bold text-center mb-4">
          {memberId ? "Create Password" : "Login"}
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">
            {error}
          </p>
        )}

        {/* 🔐 LOGIN FORM */}
        {!memberId && (
          <form onSubmit={handleLogin}>

            <input
              placeholder="Username"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
              onBlur={(e) => checkUser(e.target.value)}
              className="border p-2 mb-3 w-full"
            />

            <label className="text-sm mb-1 block">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="border p-2 mb-4 w-full"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white w-full py-2 rounded"
            >
              Login
            </button>

          </form>
        )}

        {/* 🔥 CREATE PASSWORD UI */}
        {memberId && (
          <div>

            <p className="text-xs text-gray-400 mb-2 text-center">
              First time login – create your password
            </p>

            <label className="text-sm mb-1 block">
              Create New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border p-2 mb-4 w-full"
            />

            <button
              onClick={createPassword}
              className="bg-green-600 text-white w-full py-2 rounded"
            >
              Create Password
            </button>

          </div>
        )}

      </div>

    </div>
  );
}