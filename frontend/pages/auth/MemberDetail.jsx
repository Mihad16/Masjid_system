import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function MemberDetail() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const token        = localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/members/profile/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => { setMember(data); setLoading(false); });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-green-600 border-t-transparent animate-spin" />
        <p className="text-sm text-gray-400 font-light">Loading member...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-2xl mx-auto">

        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Amiri', serif" }}>
              Member details
            </h1>
            <p className="text-[11px] text-gray-400 font-light mt-0.5">
              Masjid Manarul Islam · Kannamkulam
            </p>
          </div>
          <button
            onClick={() => navigate("/members")}
            className="text-[12px] text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-all"
          >
            ← Members
          </button>
        </div>

        {/* Profile card */}
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden mb-4">
          <div className="h-1 w-full" style={{ background: "linear-gradient(90deg,#14532d,#16a34a,#86efac,#16a34a,#14532d)" }} />

          {/* Avatar + name */}
          <div className="flex flex-col items-center px-6 pt-6 pb-5 border-b border-gray-100">
            <div className="relative mb-4">
              <div
                className="w-20 h-20 rounded-full bg-green-900 text-green-200 flex items-center justify-center text-3xl font-bold border-[3px] border-green-50 outline outline-1 outline-green-300"
                style={{ fontFamily: "'Amiri', serif" }}
              >
                {member.name?.charAt(0)}
              </div>
              <div className="absolute inset-[-4px] rounded-full border border-dashed border-green-500 opacity-40" />
            </div>
            <p className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Amiri', serif" }}>
              {member.name}
            </p>
            <span className="mt-1.5 text-[10px] font-medium tracking-widest uppercase text-green-700 bg-green-50 border border-green-200 px-3 py-0.5 rounded-full">
              Jamaath Member
            </span>
          </div>

          {/* Fields */}
          <div className="divide-y divide-gray-50">
            {[
              {
                label: "Phone",
                value: member.phone,
                icon: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 012 2a2 2 0 012-.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8a16 16 0 006.91 6.91l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>,
                iconBg: "#eff6ff", iconStroke: "#1d4ed8",
              },
              {
                label: "Address",
                value: member.address,
                icon: <><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>,
                iconBg: "#fffbeb", iconStroke: "#b45309",
              },
              {
                label: "Member ID",
                value: `#${String(id).padStart(4, "0")}`,
                icon: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3h-4a2 2 0 00-2 2v2h8V5a2 2 0 00-2-2z"/></>,
                iconBg: "#f0fdf4", iconStroke: "#15803d",
              },
            ].map(({ label, value, icon, iconBg, iconStroke }) => (
              <div key={label} className="flex items-center gap-3 px-5 py-3.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: iconBg }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={iconStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {icon}
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-medium tracking-widest uppercase text-gray-400 mb-0.5">{label}</p>
                  <p className="text-[13px] text-gray-800">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigate(`/members/${id}/varisangyam`)}
            className="flex items-center justify-center gap-2 py-2.5 text-[13px] font-medium text-green-700 bg-white border border-green-200 rounded-xl hover:bg-green-50 active:scale-95 transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
            </svg>
            Varisangyam
          </button>
          <button
            onClick={() => navigate("/members")}
            className="flex items-center justify-center gap-2 py-2.5 text-[13px] font-medium text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 active:scale-95 transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
            </svg>
            All members
          </button>
        </div>

      </div>
    </div>
  );
}