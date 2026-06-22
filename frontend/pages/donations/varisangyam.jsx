import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Varisangyam() {
  const [contributions, setContributions] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [form, setForm] = useState({
    member_id: "",
    amount: "",
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    payment_date: new Date().toISOString().split('T')[0],
    status: "paid",
    remarks: "",
  });
  const [stats, setStats] = useState({
    total_collected: 0,
    total_expected: 0,
    paid_count: 0,
    pending_count: 0,
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Months array
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Fetch members and contributions
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch members
      const membersRes = await fetch("http://127.0.0.1:8000/api/members/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const membersData = await membersRes.json();
      setMembers(membersData);

      // Fetch contributions
      const contribRes = await fetch("http://127.0.0.1:8000/api/varisangyam/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const contribData = await contribRes.json();
      setContributions(contribData);

      // Calculate stats
      const totalCollected = contribData.reduce((sum, c) => sum + parseFloat(c.amount || 0), 0);
      const paidCount = contribData.filter(c => c.status === "paid").length;
      const totalExpected = membersData.length * 100; // Assuming ₹100 per member per month
      
      setStats({
        total_collected: totalCollected,
        total_expected: totalExpected,
        paid_count: paidCount,
        pending_count: membersData.length - paidCount,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchData();
  }, []);

  const resetForm = () => {
    setForm({
      member_id: "",
      amount: "",
      month: selectedMonth,
      year: selectedYear,
      payment_date: new Date().toISOString().split('T')[0],
      status: "paid",
      remarks: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const addContribution = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://127.0.0.1:8000/api/varisangyam/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      resetForm();
      fetchData();
    } catch (error) {
      console.error("Error adding contribution:", error);
    }
  };

  const updateContribution = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://127.0.0.1:8000/api/varisangyam/update/${editingId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      resetForm();
      fetchData();
    } catch (error) {
      console.error("Error updating contribution:", error);
    }
  };

  const deleteContribution = async (id) => {
    if (!window.confirm("Delete this contribution record?")) return;
    try {
      await fetch(`http://127.0.0.1:8000/api/varisangyam/delete/${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting contribution:", error);
    }
  };

  const startEdit = (contribution) => {
    setEditingId(contribution.id);
    setForm({
      member_id: contribution.member_id,
      amount: contribution.amount,
      month: contribution.month,
      year: contribution.year,
      payment_date: contribution.payment_date,
      status: contribution.status,
      remarks: contribution.remarks || "",
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getMemberName = (memberId) => {
    const member = members.find(m => m.id === memberId);
    return member ? member.name : "Unknown";
  };

  const filteredContributions = contributions.filter(contribution => {
    const memberName = getMemberName(contribution.member_id).toLowerCase();
    return memberName.includes(searchTerm.toLowerCase()) ||
      contribution.amount.toString().includes(searchTerm) ||
      contribution.status.includes(searchTerm.toLowerCase());
  });

  const monthlyContributions = contributions.filter(c => 
    c.month === selectedMonth && c.year === selectedYear
  );

  const monthlyTotal = monthlyContributions.reduce((sum, c) => sum + parseFloat(c.amount || 0), 0);
  const monthlyPaid = monthlyContributions.filter(c => c.status === "paid").length;
  const monthlyPending = members.length - monthlyPaid;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Varisangyam Management</h1>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Track monthly contributions and dues
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 text-sm text-gray-600 bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M12 3l9 9-9 9"/>
                </svg>
                Dashboard
              </button>
              <button
                onClick={() => { setShowForm(!showForm); if (editingId) resetForm(); }}
                className="flex items-center gap-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2 rounded-lg hover:shadow-lg transition-all active:scale-95"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Record Contribution
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-500 uppercase">Total Collected</p>
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="16"/>
                    <line x1="8" y1="12" x2="16" y2="12"/>
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800">₹{stats.total_collected.toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-1">Total contributions</p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-500 uppercase">Expected Amount</p>
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                    <path d="M20 12V8h-4M12 4v4M4 4h16v16H4z"/>
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800">₹{stats.total_expected.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Expected this year</p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-500 uppercase">Paid Members</p>
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800">{stats.paid_count}</p>
              <p className="text-xs text-green-600 mt-1">Members paid</p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-500 uppercase">Pending</p>
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800">{stats.pending_count}</p>
              <p className="text-xs text-orange-600 mt-1">Pending payments</p>
            </div>
          </div>
        </div>

        {/* Month/Year Selector */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-6 p-5">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Monthly Summary</h3>
              <p className="text-sm text-gray-500 mt-0.5">View contributions by month</p>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {months.map((month, idx) => (
                  <option key={idx} value={idx}>{month}</option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {[2023, 2024, 2025].map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Monthly Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            <div className="bg-purple-50 rounded-lg p-3">
              <p className="text-xs text-purple-600 uppercase">Monthly Collection</p>
              <p className="text-xl font-bold text-purple-700">₹{monthlyTotal.toLocaleString()}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-xs text-green-600 uppercase">Paid Members</p>
              <p className="text-xl font-bold text-green-700">{monthlyPaid} / {members.length}</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-3">
              <p className="text-xs text-orange-600 uppercase">Pending Members</p>
              <p className="text-xl font-bold text-orange-700">{monthlyPending}</p>
            </div>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-6 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  {editingId ? "✏️" : "💰"}
                </div>
                <span className="text-lg font-semibold text-gray-800">
                  {editingId ? "Edit Contribution" : "Record New Contribution"}
                </span>
              </div>
            </div>
            <form onSubmit={editingId ? updateContribution : addContribution} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Member *</label>
                  <select
                    required
                    value={form.member_id}
                    onChange={(e) => setForm({ ...form, member_id: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select a member</option>
                    {members.map(member => (
                      <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹) *</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    required
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Month *</label>
                  <select
                    required
                    value={form.month}
                    onChange={(e) => setForm({ ...form, month: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {months.map((month, idx) => (
                      <option key={idx} value={idx}>{month}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year *</label>
                  <select
                    required
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {[2023, 2024, 2025].map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                  <input
                    type="date"
                    value={form.payment_date}
                    onChange={(e) => setForm({ ...form, payment_date: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                  <select
                    required
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="partial">Partial</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                  <textarea
                    placeholder="Additional notes..."
                    value={form.remarks}
                    onChange={(e) => setForm({ ...form, remarks: e.target.value })}
                    rows="2"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-2.5 rounded-lg hover:shadow-md transition-all"
                >
                  {editingId ? "Save Changes" : "Record Contribution"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by member name, amount, or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            />
          </div>
        </div>

        {/* Contributions Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-lg font-semibold text-gray-800">Contribution History</span>
                <p className="text-sm text-gray-500 mt-0.5">
                  {filteredContributions.length} records found
                </p>
              </div>
            </div>
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center gap-3 py-16">
              <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-gray-500">Loading contributions...</span>
            </div>
          )}

          {!loading && filteredContributions.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">💰</div>
              <p className="text-gray-500 mb-2">No contributions found</p>
              <p className="text-sm text-gray-400">Click "Record Contribution" to add one</p>
            </div>
          )}

          {!loading && filteredContributions.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Member</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Month</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Year</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment Date</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredContributions.map((contribution) => (
                    <tr key={contribution.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-xs font-bold text-purple-700">
                            {getMemberName(contribution.member_id).charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-gray-800">
                            {getMemberName(contribution.member_id)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{months[contribution.month]}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{contribution.year}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-800">₹{parseFloat(contribution.amount).toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full
                          ${contribution.status === 'paid' ? 'bg-green-100 text-green-700' : 
                            contribution.status === 'partial' ? 'bg-yellow-100 text-yellow-700' : 
                            'bg-red-100 text-red-700'}`}>
                          {contribution.status.charAt(0).toUpperCase() + contribution.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{contribution.payment_date}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(contribution)}
                            className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-lg hover:bg-blue-100 transition-all"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteContribution(contribution.id)}
                            className="text-xs text-red-600 bg-red-50 px-3 py-1 rounded-lg hover:bg-red-100 transition-all"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}