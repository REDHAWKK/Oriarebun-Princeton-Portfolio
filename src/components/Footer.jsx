export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/[0.06] py-12 bg-black">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-lg font-serif tracking-widest uppercase font-bold text-[#D4AF37]">OP.</div>
        <div className="text-white/20 text-[10px] tracking-[0.2em] uppercase">© {currentYear} Oriarebun Princeton. All Rights Reserved.</div>
        <div className="flex gap-6 text-white/30 text-xs tracking-wider uppercase">
          <a href="#" className="hover:text-[#D4AF37] transition-colors">GitHub</a>
          <a href="#" className="hover:text-[#D4AF37] transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-[#D4AF37] transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
}
