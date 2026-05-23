"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Subtle parallax on scroll
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onScroll = () => {
      const y = window.scrollY;
      hero.style.transform = `translateY(${y * 0.35}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Background — cinematic gradient placeholder (swap for video/image) */}
      <div
        ref={heroRef}
        className="absolute inset-0 scale-110"
        style={{ willChange: "transform" }}
      >
        {/* Hero video — autoplay, muted, looping */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://capturex2026.sgp1.cdn.digitaloceanspaces.com/corporate/tech_summit.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      {/* Dark vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 120% 120% at 50% 50%, transparent 50%, rgba(10,10,10,0.6) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, transparent 30%, transparent 60%, rgba(10,10,10,0.7) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between px-8 md:px-16 max-w-[1440px] mx-auto w-full">
        {/* Top spacer for nav */}
        <div className="pt-32" />

        {/* Hero text */}
        <div className="flex flex-col gap-6 max-w-3xl">
          <p
            className="text-[#8a8a80] text-xs tracking-[0.25em] uppercase"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Photography &amp; Film · Hyderabad
          </p>

          <h1
            className="font-light text-[#f0ece4] leading-[1.05]"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(3.5rem, 9vw, 8rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Photography
            <br />
            <em className="italic">for life&apos;s</em>
            <br />
            defining moments.
          </h1>

          <div className="flex items-center gap-8 mt-4">
            <a href="#work" className="cta-primary">
              <span>View Work</span>
              <span
                className="text-[#c9a96e]"
                style={{ fontSize: "18px", lineHeight: 1 }}
              >
                →
              </span>
            </a>
            <a href="#inquire" className="link-gold">
              Begin an inquiry
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-end justify-between pb-10">
          {/* Scroll indicator */}
          <div className="flex flex-col items-center gap-3">
            <div className="scroll-line" />
            <span
              className="text-[#8a8a80] text-[10px] tracking-[0.25em] uppercase rotate-0"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Scroll
            </span>
          </div>

          {/* Studio tagline */}
          <p
            className="text-[#8a8a80] text-xs tracking-[0.15em] uppercase text-right hidden md:block"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Weddings · Fashion · Food · Product
            <br />
            Events · Sports · Corporate Film
          </p>
        </div>
      </div>

      {/* False floor — peek of next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[8vh] pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(26,26,26,0.5))",
        }}
      />
    </section>
  );
}
