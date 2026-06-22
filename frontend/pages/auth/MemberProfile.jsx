import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MemberProfile() {
  const [member, setMember] = useState(null);
  const [form, setForm] = useState({});
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contributions, setContributions] = useState([]);
  const [contributionsLoading, setContributionsLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    const data = localStorage.getItem("member");
    if (!data) {
      navigate("/login");
      return;
    }

    const parsed = JSON.parse(data);

    // Fetch member profile
    fetch(`http://127.0.0.1:8000/api/members/profile/${parsed.id}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load profile");
        return res.json();
      })
      .then((data) => {
        setMember(data);
        setForm(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    // Fetch member contributions
    fetchContributions(parsed.id);
  }, []);

  const fetchContributions = async (memberId) => {
    setContributionsLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/varisangyam/member/${memberId}/`);
      const data = await response.json();
      setContributions(data);
    } catch (error) {
      console.error("Error fetching contributions:", error);
    } finally {
      setContributionsLoading(false);
    }
  };

  const saveProfile = async () => {
    try {
      await fetch(
        `http://127.0.0.1:8000/api/members/update/${member.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      setMember(form);
      setEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    if (confirm("Logout?")) {
      localStorage.removeItem("member");
      navigate("/login");
    }
  };

  // Calculate stats
  const totalContributions = contributions.reduce((sum, c) => sum + parseFloat(c.amount || 0), 0);
  const paidContributions = contributions.filter(c => c.status === "paid").length;
  const pendingContributions = contributions.filter(c => c.status === "pending").length;
  const filteredByYear = contributions.filter(c => c.year === selectedYear);
  const yearlyTotal = filteredByYear.reduce((sum, c) => sum + parseFloat(c.amount || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!member) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-red-500">Error loading profile</p>
        <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg">Retry</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 p-4 md:p-6">
      
      {/* Top Navigation Bar */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-3 flex justify-between items-center">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M12 3l9 9-9 9"/>
            </svg>
            <span className="text-sm font-medium">Back to Home</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-500">Online</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-emerald-600 to-green-600 relative">
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 md:left-8 md:translate-x-0">
              <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center border-4 border-white">
                <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-green-600 rounded-xl flex items-center justify-center text-white text-4xl font-bold">
                  {member.name?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-16 pb-6 px-6 md:px-8 text-center md:text-left">
            <div className="md:ml-32">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{member.name}</h1>
              <div className="flex flex-wrap gap-3 mt-2 justify-center md:justify-start">
                <span className="text-sm text-gray-500">
                  Member ID: <span className="font-mono font-semibold text-emerald-600">#{String(member.id).padStart(4, "0")}</span>
                </span>
                <span className="text-gray-300">|</span>
                <span className="inline-flex items-center gap-1 text-sm text-emerald-600">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  Active Member
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-xs text-gray-500 uppercase mb-1">Total Contributions</p>
            <p className="text-2xl font-bold text-emerald-600">₹{totalContributions.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">All time</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-xs text-gray-500 uppercase mb-1">Yearly Total ({selectedYear})</p>
            <p className="text-2xl font-bold text-blue-600">₹{yearlyTotal.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">This year</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-xs text-gray-500 uppercase mb-1">Paid Contributions</p>
            <p className="text-2xl font-bold text-green-600">{paidContributions}</p>
            <p className="text-xs text-gray-400 mt-1">Completed</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-xs text-gray-500 uppercase mb-1">Pending</p>
            <p className="text-2xl font-bold text-orange-600">{pendingContributions}</p>
            <p className="text-xs text-gray-400 mt-1">Awaiting payment</p>
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Left Sidebar - Quick Actions */}
          <div className="lg:col-span-1 space-y-4">
            
            {/* Member Since Card */}
            <div className="bg-white rounded-xl shadow-md p-5 text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-emerald-600">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <p className="text-xs text-gray-400 uppercase mb-1">Member Since</p>
              <p className="text-sm font-semibold text-gray-700">2024</p>
            </div>

            {/* Payment Summary Card */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="16"/>
                  <line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
                Payment Summary
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Payment Rate</span>
                    <span className="font-semibold text-gray-800">
                      {contributions.length > 0 ? Math.round((paidContributions / contributions.length) * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full transition-all"
                      style={{ width: `${contributions.length > 0 ? (paidContributions / contributions.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
                  <span className="text-gray-500">Total Paid</span>
                  <span className="font-semibold text-green-600">₹{totalContributions.toLocaleString()}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Content - Profile Form & Contributions */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Personal Information Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              
              <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  Personal Information
                </h2>
                {!edit && (
                  <button
                    onClick={() => setEdit(true)}
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                    </svg>
                    Edit
                  </button>
                )}
              </div>

              <div className="space-y-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs text-gray-500 uppercase mb-1 font-semibold">Full Name</label>
                  {edit ? (
                    <input
                      value={form.name || ""}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Enter full name"
                    />
                  ) : (
                    <p className="text-gray-800 py-1">{member.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs text-gray-500 uppercase mb-1 font-semibold">Phone Number</label>
                  {edit ? (
                    <input
                      value={form.phone || ""}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <p className="text-gray-800 py-1">{member.phone || "Not provided"}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs text-gray-500 uppercase mb-1 font-semibold">Address</label>
                  {edit ? (
                    <textarea
                      value={form.address || ""}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Enter address"
                      rows="3"
                    />
                  ) : (
                    <p className="text-gray-800 py-1">{member.address || "Not provided"}</p>
                  )}
                </div>

              </div>

              {/* Action Buttons when editing */}
              {edit && (
                <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                  <button
                    onClick={saveProfile}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setForm(member);
                      setEdit(false);
                    }}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}

            </div>

            {/* Varisangyam Contributions Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                  </svg>
                  Varisangyam Contributions
                </h2>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {[2023, 2024, 2025].map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {contributionsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : contributions.filter(c => c.year === selectedYear).length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">💰</div>
                  <p className="text-gray-500">No contributions found for {selectedYear}</p>
                  <p className="text-xs text-gray-400 mt-1">Your payment history will appear here</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 rounded-lg">
                      <tr>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Month</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Payment Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {contributions
                        .filter(c => c.year === selectedYear)
                        .sort((a, b) => a.month - b.month)
                        .map((contribution) => (
                          <tr key={contribution.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-700">{months[contribution.month]}</td>
                            <td className="px-4 py-3 text-sm font-semibold text-gray-800">₹{parseFloat(contribution.amount).toLocaleString()}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full
                                ${contribution.status === 'paid' ? 'bg-green-100 text-green-700' : 
                                  contribution.status === 'partial' ? 'bg-yellow-100 text-yellow-700' : 
                                  'bg-red-100 text-red-700'}`}>
                                {contribution.status.charAt(0).toUpperCase() + contribution.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">{contribution.payment_date || "-"}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Logout Button */}
            {!edit && (
              <div>
                <button
                  onClick={logout}
                  className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-medium py-3 rounded-xl transition-colors border border-red-200"
                >
                  Logout
                </button>
              </div>
            )}

          </div>

        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            Masjid Manarul Islam · Kannamkulam, Kerala
          </p>
        </div>

      </div>
    </div>
  );
}