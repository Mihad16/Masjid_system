import { useNavigate, useLocation } from "react-router-dom";

const PAGE_TITLES = {
  "/dashboard":   { title: "Dashboard",    sub: "Overview & quick stats", icon: "📊" },
  "/members":     { title: "Members",      sub: "Manage jamaath members", icon: "👥" },
  "/varisangyam": { title: "Varisangyam",  sub: "Monthly dues & collection", icon: "💰" },
  "/donations":   { title: "Donations",    sub: "Track contributions", icon: "🤝" },
  "/reports":     { title: "Reports",      sub: "Export & view records", icon: "📈" },
};

export default function Navbar() {
  const navigate  = useNavigate();
  const { pathname } = useLocation();

  const page = Object.entries(PAGE_TITLES).find(([path]) =>
    pathname === path || pathname.startsWith(path + "/")
  );
  const { title, sub, icon } = page?.[1] ?? { title: "Admin Panel", sub: "Masjid Manarul Islam", icon: "☾" };

  const logout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <header
      className="bg-gradient-to-r from-white via-emerald-50/30 to-white border-b border-emerald-100 px-6 py-4 shadow-sm"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="flex items-center justify-between">
        
        {/* Left — dynamic page title */}
        <div className="flex items-center gap-3">
          {/* Page Icon */}
          <div className="hidden sm:flex w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl items-center justify-center shadow-md">
            <span className="text-lg">{icon}</span>
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <h2
                className="text-xl font-bold text-gray-800 leading-tight"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {title}
              </h2>
              {/* Online Status Badge */}
              <div className="flex items-center gap-1.5 bg-green-50 px-2 py-0.5 rounded-full">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[9px] text-green-700 font-medium">Live</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
          </div>
        </div>

        {/* Right — actions */}
        <div className="flex items-center gap-4">
          
          {/* Date/Time */}
          <div className="hidden md:block text-right">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </p>
            <p className="text-[11px] font-medium text-gray-600">
              {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>

          {/* Notification Bell */}
          <button className="relative p-2 text-gray-500 hover:text-emerald-600 transition-colors rounded-lg hover:bg-emerald-50">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Masjid badge */}
          <div className="hidden lg:flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
            <span className="text-sm">☾</span>
            <span className="text-[10px] font-semibold tracking-wider uppercase text-emerald-800">
              Manarul Islam
            </span>
          </div>

          {/* Admin avatar dropdown */}
          <div className="relative group">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 text-white flex items-center justify-center text-sm font-bold shadow-md">
                A
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-gray-700">Admin User</p>
                <p className="text-[9px] text-gray-400">Administrator</p>
              </div>
              <svg className="hidden sm:block w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 8v8M8 12h8"/>
                  </svg>
                  Profile Settings
                </button>
                <hr className="my-1 border-gray-100" />
                <button 
                  onClick={logout}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Logout Button */}
          <button
            onClick={logout}
            className="lg:hidden flex items-center gap-1.5 text-[12px] font-medium text-red-600 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 active:scale-95 transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>

        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-emerald-50">
        <span className="text-xs text-gray-400">Admin</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
        <span className="text-xs font-medium text-emerald-700">{title}</span>
      </div>
    </header>
  );
}