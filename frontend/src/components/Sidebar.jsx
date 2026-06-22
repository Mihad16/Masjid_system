import { Link, useLocation } from "react-router-dom";

const iconProps = {
  width: 20, height: 20, viewBox: "0 0 24 24",
  fill: "none", strokeWidth: 2,
  strokeLinecap: "round", strokeLinejoin: "round",
};

const NAV_ITEMS = [
  {
    label: "Dashboard", to: "/dashboard",
    icon: (s) => <svg {...iconProps} stroke={s}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  },
  {
    label: "Members", to: "/members",
    icon: (s) => <svg {...iconProps} stroke={s}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  },
  {
    label: "Varisangyam", to: "/varisangyam",
    icon: (s) => <svg {...iconProps} stroke={s}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  },
  {
    label: "Donations", to: "/donations",
    icon: (s) => <svg {...iconProps} stroke={s}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  },
  {
    label: "Reports", to: "/reports",
    icon: (s) => <svg {...iconProps} stroke={s}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside
      className="flex flex-col w-72 bg-white border-r border-gray-200 shadow-sm flex-shrink-0"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Logo Section */}
      <div className="px-6 py-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-2xl">☾</span>
          </div>
          <div>
            <p
              className="text-xl font-bold text-gray-800 leading-tight"
              style={{ fontFamily: "'Amiri', serif" }}
            >
              Manarul Islam
            </p>
            <p className="text-[11px] text-emerald-600 tracking-wider font-medium mt-0.5">
              Jamaath Management
            </p>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="px-6 py-5 bg-gradient-to-r from-emerald-50 to-green-50 m-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <span className="text-lg">👋</span>
          </div>
          <div>
            <p className="text-xs text-gray-500">Welcome back,</p>
            <p className="text-sm font-semibold text-gray-800">Admin User</p>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col flex-1 px-4 space-y-1">
        <p className="px-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Main Menu
        </p>
        
        {NAV_ITEMS.map(({ label, to, icon }) => {
          const active = pathname === to || pathname.startsWith(to + "/");
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 no-underline group
                ${active
                  ? "bg-emerald-50 text-emerald-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              <span className={`transition-all duration-200 ${active ? "text-emerald-600" : "text-gray-400 group-hover:text-gray-600"}`}>
                {icon(active ? "#059669" : "#9ca3af")}
              </span>
              <span>{label}</span>
              {active && (
                <span className="ml-auto w-1.5 h-5 bg-emerald-600 rounded-full"></span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto px-4 py-6 border-t border-gray-100">
        
        {/* Quick Stats */}
        

        {/* Masjid Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>Kannamkulam, Kerala</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>Established 1998</span>
          </div>
        </div>

        {/* Help/Support Link */}
        <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          Help & Support
        </button>

        {/* Version */}
        <div className="mt-3 pt-2">
          <p className="text-[9px] text-gray-300 font-mono text-center">
            v2.0.0 · Manarul Islam
          </p>
        </div>
      </div>
    </aside>
  );
}