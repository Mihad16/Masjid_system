import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function SetPassword() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const save = async () => {
    await fetch(`http://127.0.0.1:8000/api/members/set-password/${id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    alert("Password set! Login now.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-6 rounded shadow w-80">

        <h2 className="text-lg font-bold mb-4 text-center">
          Set Password
        </h2>

        <input
          type="password"
          placeholder="New password"
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          onClick={save}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Save Password
        </button>

      </div>

    </div>
  );
}