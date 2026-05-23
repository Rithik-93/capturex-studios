"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CategoryTopBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "py-4 bg-void/90 backdrop-blur-md border-b border-white/[0.06]"
          : "py-7"
      }`}
    >
      <div className="max-w-360 mx-auto px-8 md:px-16 flex items-center justify-between">
        {/* Back to home */}
        <Link
          href="/"
          className="group flex items-center gap-3 no-underline"
        >
          <span
            className="text-gold transition-transform duration-500 group-hover:-translate-x-1"
            style={{ fontSize: "16px", lineHeight: 1 }}
          >
            ←
          </span>
          <span
            className="font-heading text-ivory text-lg font-light tracking-[0.25em] uppercase"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            CaptureX
          </span>
        </Link>

        {/* Right: index */}
        <Link href="/#work" className="nav-link">
          All Practices
        </Link>
      </div>
    </header>
  );
}
