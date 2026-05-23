"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Journal", href: "#journal" },
  { label: "Inquire", href: "#inquire" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "py-4 bg-[#1a1a1a]/90 backdrop-blur-md border-b border-white/[0.06]"
            : "py-7"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-[#f0ece4] text-xl font-light tracking-[0.25em] uppercase no-underline"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            CaptureX
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 cursor-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-px bg-[#f0ece4] transition-all duration-400 ${
                menuOpen ? "rotate-45 translate-y-[6px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-[#f0ece4] transition-all duration-400 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-[#f0ece4] transition-all duration-400 ${
                menuOpen ? "-rotate-45 -translate-y-[6px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#1a1a1a] flex flex-col items-center justify-center transition-all duration-700 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-10">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-heading text-[#f0ece4] text-5xl font-light italic tracking-wide no-underline transition-all duration-300 hover:text-[#c9a96e]"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                transitionDelay: menuOpen ? `${i * 80}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <p className="absolute bottom-12 text-[#8a8a80] text-xs tracking-[0.2em] uppercase">
          Hyderabad, India
        </p>
      </div>
    </>
  );
}
