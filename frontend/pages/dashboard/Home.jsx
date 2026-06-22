import { useNavigate } from "react-router-dom";

export default function MainHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden">
      
      {/* Decorative background circles */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-0 -right-20 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-20 left-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

      {/* Top gradient bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600" />

      {/* Header Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10">
        
        {/* Logo/Badge */}
        <div className="mb-6 relative">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
            <span className="text-4xl filter drop-shadow-sm">☾</span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full border-2 border-white shadow-md flex items-center justify-center text-xs">
            ★
          </div>
        </div>

        {/* Arabic Text */}
        <p 
          className="text-emerald-700 text-2xl mb-2 font-serif"
          style={{ fontFamily: "'Amiri', serif", direction: "rtl" }}
        >
          مسجد منارة الإسلام
        </p>

        {/* Main Title */}
        <h1 
          className="text-4xl font-bold text-gray-800 text-center leading-tight mb-2 tracking-tight"
          style={{ fontFamily: "'Amiri', serif" }}
        >
          Masjid Manarul Islam
        </h1>

        {/* Subtitle */}
        <p className="text-sm tracking-wider uppercase text-gray-500 font-medium mb-3 flex items-center gap-2">
          <span className="w-8 h-px bg-emerald-400 inline-block"></span>
          Juma Masjid · Kannamkulam
          <span className="w-8 h-px bg-emerald-400 inline-block"></span>
        </p>

        {/* Description */}
        <div className="max-w-md text-center mb-6">
          <p className="text-gray-600 text-sm leading-relaxed">
            Empowering the community through seamless management of members, 
            donations, and Varisangyam contributions
          </p>
        </div>

        {/* Stats Badge */}
        <div className="flex gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-sm border border-gray-100">
            <span className="text-xs text-gray-500">📊 Active Members</span>
            <span className="ml-2 text-sm font-semibold text-emerald-600">1,284+</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-sm border border-gray-100">
            <span className="text-xs text-gray-500">🤝 Monthly Contribution</span>
            <span className="ml-2 text-sm font-semibold text-emerald-600">₹2.5L+</span>
          </div>
        </div>

        {/* Login Cards - New Design */}
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl">
          
          {/* Admin Card */}
          <button
            onClick={() => navigate("/login?role=admin")}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
          >
            {/* Card Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-green-700 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            
            <div className="p-6 text-left">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div className="bg-emerald-50 px-3 py-1 rounded-full">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Committee Access</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-1">Admin Portal</h3>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                Full control over members, financial reports, and system settings
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-emerald-700">A</div>
                  <div className="w-6 h-6 bg-emerald-100 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-emerald-700">B</div>
                  <div className="w-6 h-6 bg-emerald-100 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-emerald-700">C</div>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 group-hover:gap-2 transition-all">
                  Access Dashboard
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </button>

          {/* Member Card */}
          <button
            onClick={() => navigate("/login?role=member")}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            
            <div className="p-6 text-left">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </div>
                <div className="bg-blue-50 px-3 py-1 rounded-full">
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Member Access</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-1">Member Portal</h3>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                View your profile, track contributions, and access Varisangyam details
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-blue-700">M</div>
                  <div className="w-6 h-6 bg-blue-100 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-blue-700">E</div>
                  <div className="w-6 h-6 bg-blue-100 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-blue-700">P</div>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">
                  View Profile
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 bg-white/80 backdrop-blur-sm border-t border-gray-200 px-6 py-4 mt-8">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-3">
          {[
            { icon: "📍", text: "Kannamkulam, Kerala" },
            { icon: "📊", text: "Varisangyam Tracking" },
            { icon: "📝", text: "Member Records" },
            { icon: "🤝", text: "Community Support" }
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-xs text-gray-500">
              <span className="text-sm">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}