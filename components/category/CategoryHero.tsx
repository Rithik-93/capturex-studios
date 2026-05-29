"use client";

import { useEffect, useRef } from "react";
import type { Category } from "@/lib/categories";
import { asset } from "@/lib/media";

export default function CategoryHero({ category }: { category: Category }) {
  const heroRef = useRef<HTMLDivElement>(null);

  // Slow parallax on the background
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < window.innerHeight * 1.5) {
        el.style.transform = `translateY(${y * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Background media */}
      <div
        ref={heroRef}
        className="absolute inset-0 scale-110"
        style={{ willChange: "transform" }}
      >
        {category.hero.type === "video" ? (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={asset(category.hero.src)}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={asset(category.hero.src)}
            alt={category.hero.alt || category.label}
          />
        )}
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 120% 120% at 50% 50%, transparent 40%, rgba(10,10,10,0.7) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.45) 0%, transparent 25%, transparent 55%, rgba(10,10,10,0.85) 100%)",
        }}
      />
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full max-w-360 mx-auto w-full px-8 md:px-16 flex flex-col justify-between">
        <div className="pt-32" />

        <div className="flex flex-col gap-5 max-w-4xl pb-20">
          <div className="flex items-center gap-4">
            <span
              className="text-gold text-[10px] tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {category.number} / 06
            </span>
            <span className="w-12 h-px bg-gold/40" />
            <span
              className="text-mist text-[10px] tracking-[0.25em] uppercase"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {category.kicker}
            </span>
          </div>

          <h1
            className="text-ivory font-light leading-[0.95]"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(3.5rem, 11vw, 11rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {category.label}
          </h1>

          <p
            className="text-mist text-xs tracking-[0.2em] uppercase mt-4"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {category.meta}
          </p>
        </div>

        {/* Scroll cue */}
        <div className="flex items-end justify-between pb-10">
          <div className="flex flex-col items-center gap-3">
            <div className="scroll-line" />
            <span
              className="text-mist text-[10px] tracking-[0.25em] uppercase"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              The Work
            </span>
          </div>
          <p
            className="text-mist text-[10px] tracking-[0.2em] uppercase text-right hidden md:block"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {category.media.length} pieces
            <br />
            in this practice
          </p>
        </div>
      </div>

      {/* False floor peek */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[6vh] pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(26,26,26,0.6))",
        }}
      />
    </section>
  );
}
