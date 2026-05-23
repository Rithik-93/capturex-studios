"use client";

import { useEffect, useRef, useState } from "react";

export default function Showreel() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="video-section relative w-full bg-[#0a0a0a] py-0 overflow-hidden"
    >
      {/* Top / bottom decorative lines */}
      <div className="divider" />

      <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-20">
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            <p
              className="text-[#8a8a80] text-[10px] tracking-[0.25em] uppercase mb-4"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Showreel 2025
            </p>
            <h2
              className="text-[#f0ece4] font-light leading-tight"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
              }}
            >
              We make films,
              <br />
              <em className="italic">not just videos.</em>
            </h2>
          </div>
          <p
            className="text-[#8a8a80] max-w-xs leading-relaxed"
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "13px",
              lineHeight: "1.8",
            }}
          >
            Two minutes. Seven cities. Forty shoots.
            <br />
            Every frame earned.
          </p>
        </div>
      </div>

      {/* Full-width video container */}
      <div
        className={`relative w-full overflow-hidden transition-all duration-1000 delay-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ aspectRatio: "21/9" }}
      >
        {/* Cinematic letterbox placeholder — replace with actual video embed */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #0f1a0f 0%, #0a0a14 50%, #1a0f0a 100%)",
          }}
        />

        {/* Grid lines (cinematic feel) */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(240,236,228,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(240,236,228,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(10,10,10,0) 0%, rgba(10,10,10,0.5) 100%)",
          }}
        />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="play-btn group flex flex-col items-center gap-4">
            <div className="relative">
              {/* Outer ring pulse */}
              <div
                className="absolute inset-0 rounded-full border border-[#c9a96e]/20 scale-110 animate-ping"
                style={{ animationDuration: "2.5s" }}
              />
              <div
                className="w-20 h-20 rounded-full border border-[#c9a96e]/50 flex items-center justify-center transition-all duration-500 group-hover:border-[#c9a96e] group-hover:bg-[#c9a96e]/[0.08]"
              >
                {/* Triangle */}
                <div
                  className="w-0 h-0 ml-1"
                  style={{
                    borderTop: "10px solid transparent",
                    borderBottom: "10px solid transparent",
                    borderLeft: "16px solid #c9a96e",
                  }}
                />
              </div>
            </div>
            <span
              className="text-[#8a8a80] text-[10px] tracking-[0.25em] uppercase group-hover:text-[#c9a96e] transition-colors duration-300"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Play Reel
            </span>
          </button>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-6 right-8">
          <span
            className="text-[#8a8a80] text-[10px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            2:14
          </span>
        </div>
      </div>

      <div className="divider mt-0" />
    </section>
  );
}
