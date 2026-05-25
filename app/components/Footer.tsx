export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.05] py-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

        <div className="flex items-center gap-5">
          <a href="#" className="font-mono text-sm font-bold text-[#eceae3] hover:text-[#6d63ff] transition-colors duration-300">
            anand<span className="text-[#6d63ff]">.</span>
          </a>
          <span className="font-mono text-[10px] text-[#1e1c28]">·</span>
          <span className="font-mono text-[10px] text-[#2e2c38] tracking-wider">
            built in <span className="text-[#56545e]">Улаанбаатар</span>, hosted on Vercel
          </span>
        </div>

        <nav className="flex flex-wrap gap-5">
          {[["#now","Now"],["#work","Work"],["#stack","Stack"],["#journey","Journey"],["#contact","Contact"]].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="font-mono text-[11px] text-[#2e2c38] hover:text-[#a09cff] transition-colors duration-300 tracking-widest"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <kbd className="font-mono text-[9px] text-[#2e2c38] border border-white/[0.06] rounded px-1.5 py-0.5 tracking-wider">⌘K</kbd>
          <p className="font-mono text-[10px] text-[#2e2c38]">© {year} Anand</p>
        </div>
      </div>
    </footer>
  );
}
