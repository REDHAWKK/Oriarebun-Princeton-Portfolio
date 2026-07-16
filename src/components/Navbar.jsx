export default function Navbar({ activeSection, navItems, mobileOpen, setMobileOpen, scrollToSection }) {
  return (
    <>
      {/* Desktop Floating Dock */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 px-2 py-2 rounded-full bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-2xl shadow-black/50">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToSection(item.id)}
            className={`relative px-5 py-2.5 text-[11px] tracking-[0.15em] uppercase rounded-full transition-all duration-300 ${activeSection === item.id ? "bg-[#D4AF37] text-black font-semibold shadow-[0_0_20px_rgba(212,175,55,0.3)]" : "text-white/50 hover:text-white hover:bg-white/5"}`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Mobile Header */}
      <div className="fixed top-0 left-0 w-full z-50 flex md:hidden items-center justify-between px-6 py-5 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <span className="text-sm font-serif tracking-widest uppercase font-bold text-[#D4AF37]">OP.</span>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white/80"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" /></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
        {navItems.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToSection(item.id)}
            style={{ transitionDelay: mobileOpen ? `${i * 40}ms` : "0ms" }}
            className={`text-2xl font-serif tracking-widest uppercase transition-all duration-300 ${activeSection === item.id ? "text-[#D4AF37]" : "text-white/40 hover:text-white"}`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
}
