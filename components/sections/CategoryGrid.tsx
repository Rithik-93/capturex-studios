"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { CATEGORIES, getGridPreview } from "@/lib/categories";
import { asset } from "@/lib/media";

export default function CategoryGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const items = grid.querySelectorAll<HTMLElement>(".cat-item");
          items.forEach((item, i) => {
            setTimeout(() => item.classList.add("visible"), i * 80);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(grid);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-void py-24" id="work">
      <div className="max-w-360 mx-auto px-8 md:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p
              className="text-mist text-[10px] tracking-[0.25em] uppercase mb-4"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Our Practice
            </p>
            <h2
              className="text-ivory font-light leading-tight"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
              }}
            >
              Six disciplines.
              <br />
              <em className="italic">One obsession.</em>
            </h2>
          </div>
          <p
            className="text-mist max-w-xs leading-relaxed"
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "13px",
              lineHeight: "1.8",
            }}
          >
            Each category is a dedicated practice — not a side offering.
            We go deep or we don&apos;t go at all.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/6"
        >
          {CATEGORIES.map((cat, i) => {
            const preview = getGridPreview(cat);
            return (
              <Link
                key={cat.slug}
                href={`/work/${cat.slug}`}
                className="cat-item reveal category-card bg-void block no-underline group"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* Lightweight still preview — never a video, never 6 simultaneous loads */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-[1.04]"
                  src={asset(preview.src)}
                  alt={preview.alt}
                  loading={i < 3 ? "eager" : "lazy"}
                  decoding="async"
                />

                {/* Grade — warm shadow tint */}
                <div
                  className="absolute inset-0 mix-blend-multiply opacity-60 pointer-events-none"
                  style={{ background: "#1a1410" }}
                />

                {/* Overlay gradient */}
                <div className="overlay pointer-events-none" />

                {/* Number */}
                <span
                  className="absolute top-6 right-6 text-white/20 font-light select-none z-10 pointer-events-none"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "5rem",
                    lineHeight: 1,
                  }}
                >
                  {cat.number}
                </span>

                {/* Label */}
                <div className="cat-label z-10 pointer-events-none">
                  <p
                    className="text-mist text-[10px] tracking-[0.2em] uppercase mb-2 group-hover:text-gold transition-colors duration-400"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {cat.kicker}
                  </p>
                  <h3
                    className="text-ivory font-light"
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                    }}
                  >
                    {cat.label}
                  </h3>

                  <div className="mt-4 overflow-hidden h-px">
                    <div className="h-px bg-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
                  </div>

                  <div className="mt-4 overflow-hidden">
                    <span
                      className="block text-gold text-[10px] tracking-[0.25em] uppercase opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      View Practice →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
