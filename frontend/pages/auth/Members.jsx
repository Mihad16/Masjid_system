import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Members() {
  const [members, setMembers]   = useState([]);
  const [form, setForm]         = useState({ name: "", phone: "", address: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate                = useNavigate();
  const token                   = localStorage.getItem("token");

  const fetchMembers = () => {
    setLoading(true);
    fetch("http://127.0.0.1:8000/api/members/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => { setMembers(data); setLoading(false); });
  };

  useEffect(() => { fetchMembers(); }, []);

  const resetForm = () => {
    setForm({ name: "", phone: "", address: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const addMember = async (e) => {
    e.preventDefault();
    await fetch("http://127.0.0.1:8000/api/members/add/", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    });
    resetForm();
    fetchMembers();
  };

  const updateMember = async (e) => {
    e.preventDefault();
    await fetch(`http://127.0.0.1:8000/api/members/update/${editingId}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    });
    resetForm();
    fetchMembers();
  };

  const deleteMember = async (id) => {
    if (!window.confirm("Remove this member?")) return;
    await fetch(`http://127.0.0.1:8000/api/members/delete/${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchMembers();
  };

  const startEdit = (m) => {
    setEditingId(m.id);
    setForm({ name: m.name, phone: m.phone, address: m.address });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredMembers = members.filter(member =>
    member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone?.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Page Header with Stats */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                    <path d="M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Members Directory</h1>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Manage and view all jamaath members
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
                className="flex items-center gap-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-green-600 px-5 py-2 rounded-lg hover:shadow-lg transition-all active:scale-95"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                {showForm ? "Cancel" : "Add Member"}
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 uppercase mb-1">Total Members</p>
              <p className="text-2xl font-bold text-gray-800">{members.length}</p>
              <p className="text-xs text-green-600 mt-1">+12 this month</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 uppercase mb-1">Active Members</p>
              <p className="text-2xl font-bold text-gray-800">{members.length}</p>
              <p className="text-xs text-green-600 mt-1">98% active</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 uppercase mb-1">New This Month</p>
              <p className="text-2xl font-bold text-gray-800">12</p>
              <p className="text-xs text-gray-500 mt-1">↑ 8% from last month</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 uppercase mb-1">Contribution Rate</p>
              <p className="text-2xl font-bold text-gray-800">85%</p>
              <p className="text-xs text-green-600 mt-1">↑ 5% increase</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name or phone number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
            />
          </div>
        </div>

        {/* Add / Edit Form Card */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-6 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  {editingId ? "✏️" : "➕"}
                </div>
                <span className="text-lg font-semibold text-gray-800">
                  {editingId ? "Edit Member Details" : "Add New Member"}
                </span>
              </div>
            </div>
            <form onSubmit={editingId ? updateMember : addMember} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    placeholder="Enter address"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    rows="2"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-medium py-2.5 rounded-lg hover:shadow-md transition-all"
                >
                  {editingId ? "Save Changes" : "Add Member"}
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

        {/* Members Grid/List View */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-lg font-semibold text-gray-800">All Members</span>
                <p className="text-sm text-gray-500 mt-0.5">
                  {filteredMembers.length} {filteredMembers.length === 1 ? 'member' : 'members'} found
                </p>
              </div>
              <div className="flex gap-2">
                <button className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">Grid View</button>
                <button className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">List View</button>
              </div>
            </div>
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center gap-3 py-16">
              <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-gray-500">Loading members...</span>
            </div>
          )}

          {!loading && filteredMembers.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">👥</div>
              <p className="text-gray-500 mb-2">No members found</p>
              <p className="text-sm text-gray-400">Click "Add Member" to get started</p>
            </div>
          )}

          {!loading && filteredMembers.length > 0 && (
            <div className="divide-y divide-gray-100">
              {filteredMembers.map((m, i) => (
                <div
                  key={m.id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group"
                >
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm">
                      {m.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/members/${m.id}`}
                      className="text-base font-semibold text-gray-800 hover:text-emerald-600 transition-colors no-underline flex items-center gap-2"
                    >
                      {m.name}
                      <span className="text-xs text-gray-400 font-normal">#{String(m.id).padStart(4, "0")}</span>
                    </Link>
                    <div className="flex flex-wrap gap-3 mt-1">
                      {m.phone && (
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                          </svg>
                          {m.phone}
                        </p>
                      )}
                      {m.address && (
                        <p className="text-xs text-gray-500 flex items-center gap-1 truncate max-w-md">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                          </svg>
                          {m.address}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => startEdit(m)}
                      className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteMember(m.id)}
                      className="text-xs font-medium text-red-600 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}