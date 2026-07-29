import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function MainHome() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Sample prayer times
  const prayerTimes = {
    Fajr: "5:15 AM",
    Sunrise: "6:45 AM",
    Dhuhr: "12:30 PM",
    Asr: "3:45 PM",
    Maghrib: "6:30 PM",
    Isha: "8:00 PM"
  };

  // Sample announcements
  const announcements = [
    { id: 1, title: "Weekly Tafseer Class", date: "Every Saturday", desc: "Join us for Tafseer of Surah Al-Kahf after Maghrib prayer" },
    { id: 2, title: "Ramadan Preparation", date: "Coming Soon", desc: "Registration open for Ramadan Iftar and Taraweeh arrangements" },
    { id: 3, title: "Community Iftar", date: "This Friday", desc: "Monthly community Iftar gathering - All are welcome!" }
  ];

  // Sample events
  const events = [
    { id: 1, title: "Islamic Lecture Series", date: "Aug 15, 2026", time: "7:00 PM", location: "Main Hall" },
    { id: 2, title: "Youth Quran Competition", date: "Aug 22, 2026", time: "4:00 PM", location: "Education Center" },
    { id: 3, title: "Community Cleanup Day", date: "Aug 29, 2026", time: "8:00 AM", location: "Mosque Grounds" }
  ];

  // Gallery images
  const galleryImages = [
    "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1559767949-0faa5c7e9992?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1560951060-4f9bd8b6fc22?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1559767949-0faa5c7e9992?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1560951060-4f9bd8b6fc22?w=400&h=300&fit=crop"
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <span className="text-xl text-white drop-shadow-sm">☾</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-gray-800 tracking-tight">Masjid Manarul Islam</p>
                <p className="text-[10px] text-gray-400 tracking-[0.15em] uppercase">Juma Masjid · Kannamkulam</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold rounded-xl hover:bg-emerald-100 transition-all duration-300">
                🕌 Prayer Times
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all duration-300"
              >
                Member Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== FULL SCREEN HERO IMAGE ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1600&h=900&fit=crop"
            alt="Masjid Manarul Islam"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 mb-6">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-semibold text-white/90 tracking-[0.15em] uppercase">Welcome to our mosque</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight drop-shadow-2xl">
            <span className="block text-emerald-300" style={{ fontFamily: "'Amiri', serif" }}>
              مسجد منارة الإسلام
            </span>
          </h1>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white/90 mb-6 drop-shadow-xl">
            Masjid Manarul Islam
          </h2>

          <p className="text-lg text-white/80 max-w-2xl mx-auto font-light tracking-wide">
            A Center of Faith, Knowledge, and Community Service
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 flex items-center gap-2">
              <span>🕌</span> Prayer Times
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold rounded-2xl border border-white/30 transition-all duration-300 flex items-center gap-2"
            >
              <span>👤</span> Member Login
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
              <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TODAY'S PRAYER TIMES ===== */}
      <section className="py-16 bg-gradient-to-b from-white to-emerald-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Today's Prayer Times</h2>
            <p className="text-gray-500">{currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(prayerTimes).map(([name, time]) => (
              <div key={name} className="bg-white rounded-2xl p-5 text-center shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">{name}</div>
                <div className="text-2xl font-bold text-gray-800 mt-2">{time}</div>
                <div className="w-12 h-0.5 bg-emerald-200 mx-auto mt-2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>






      {/* ===== GALLERY ===== */}
      <section className="py-16 bg-emerald-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Gallery</h2>
            <p className="text-gray-500 text-sm mt-1">Glimpses of our mosque</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {galleryImages.map((img, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer">
                <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-white text-xs font-medium">📸 View</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT THE MASJID ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full tracking-wider">ABOUT US</span>
              <h2 className="text-3xl font-bold text-gray-800 mt-3 mb-4">About the Masjid</h2>
              <p className="text-gray-600 font-light leading-relaxed mb-4">
                Masjid Manarul Islam has been serving the community of Kannamkulam for over 25 years.
                Established in 1998, we are dedicated to fostering faith, knowledge, and community service.
              </p>
              <p className="text-gray-600 font-light leading-relaxed mb-6">
                Our mosque provides daily prayers, educational programs, community events, and social services
                to Muslims and the wider community. We believe in building bridges and strengthening bonds.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-emerald-500">✓</span> Daily Prayers
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-emerald-500">✓</span> Educational Programs
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-emerald-500">✓</span> Community Events
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-emerald-500">✓</span> Social Services
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&h=400&fit=crop"
                alt="About Masjid"
                className="rounded-3xl shadow-2xl w-full h-80 object-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-lg shadow-emerald-500/30">
                <div className="text-2xl font-bold">25+</div>
                <div className="text-[10px] tracking-wider">Years of Service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT + GOOGLE MAPS ===== */}
      <section className="py-16 bg-gradient-to-b from-emerald-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
            <p className="text-gray-500 text-sm mt-1">Get in touch with the mosque</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-xl">📍</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Address</h3>
                    <p className="text-sm text-gray-500 font-light">Kannamkulam, Kerala, India</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-xl">📞</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone</h3>
                    <p className="text-sm text-gray-500 font-light">+91 12345 67890</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-xl">✉️</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <p className="text-sm text-gray-500 font-light">info@masjidmanarul.org</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-6 text-white">
                <h4 className="font-bold mb-2">Prayer Schedule</h4>
                <p className="text-sm text-white/80">Visit us for all five daily prayers</p>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {Object.entries(prayerTimes).slice(0, 3).map(([name, time]) => (
                    <div key={name} className="bg-white/10 rounded-lg p-2 text-center">
                      <div className="text-[10px] text-white/70">{name}</div>
                      <div className="text-xs font-semibold">{time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3896.278612664274!2d75.0334831!3d12.4311479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4811e424a37a3%3A0x8c8df9d9b7475d70!2sManarul%20Islam%20Masjid!5e0!3m2!1sen!2sin!4v1785357738850!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mosque Location"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>


      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                  <span className="text-xl">☾</span>
                </div>
                <div>
                  <p className="font-bold">Masjid Manarul Islam</p>
                  <p className="text-xs text-gray-400">Juma Masjid · Kannamkulam</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                A Center of Faith, Knowledge, and Community Service since 1998.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400 font-light">
                <li><button className="hover:text-emerald-400 transition-colors">Prayer Times</button></li>
                <li><button className="hover:text-emerald-400 transition-colors">Events</button></li>
                <li><button className="hover:text-emerald-400 transition-colors">Donations</button></li>
                <li><button className="hover:text-emerald-400 transition-colors">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-gray-400 font-light">
                <li><button className="hover:text-emerald-400 transition-colors">Volunteer</button></li>
                <li><button className="hover:text-emerald-400 transition-colors">Programs</button></li>
                <li><button className="hover:text-emerald-400 transition-colors">Education</button></li>
                <li><button className="hover:text-emerald-400 transition-colors">Support</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <div className="flex gap-3 mb-4">
                <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">📱</button>
                <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">📘</button>
                <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">📺</button>
                <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">📷</button>
              </div>
              <p className="text-xs text-gray-400 font-light">Subscribe to our newsletter</p>
              <div className="flex mt-2">
                <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 bg-gray-800 rounded-l-lg text-sm text-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                <button className="px-4 py-2 bg-emerald-600 rounded-r-lg hover:bg-emerald-700 transition-colors text-sm">→</button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-sm text-gray-400 font-light">© 2024 Masjid Manarul Islam. All rights reserved.</span>
            <div className="flex gap-6 text-xs text-gray-400 font-light">
              <button className="hover:text-emerald-400 transition-colors">Privacy Policy</button>
              <button className="hover:text-emerald-400 transition-colors">Terms of Service</button>
              <button className="hover:text-emerald-400 transition-colors">Sitemap</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}