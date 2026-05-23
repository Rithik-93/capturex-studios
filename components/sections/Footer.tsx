export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#141414] border-t border-white/[0.06]">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          {/* Logo + tagline */}
          <div>
            <p
              className="text-[#f0ece4] text-xl font-light tracking-[0.25em] uppercase mb-3"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              CaptureX
            </p>
            <p
              className="text-[#8a8a80] text-[11px] tracking-[0.15em] uppercase"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Photography &amp; Film · Hyderabad, India
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col sm:flex-row gap-6 sm:gap-10">
            {["Work", "About", "Journal", "Inquire"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-link"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <p
              className="text-[#8a8a80] text-[10px] tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Follow
            </p>
            <div className="flex gap-6">
              {["Instagram", "Behance", "Vimeo"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="text-[#8a8a80] hover:text-[#f0ece4] transition-colors duration-300 text-[11px] tracking-[0.12em] uppercase no-underline"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p
            className="text-[#8a8a80]/50 text-[10px] tracking-[0.15em] uppercase"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            © {year} CaptureX Studio. All rights reserved.
          </p>
          <div className="flex gap-8">
            {["Privacy", "Terms"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[#8a8a80]/50 hover:text-[#8a8a80] transition-colors duration-300 text-[10px] tracking-[0.15em] uppercase no-underline"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
