"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Category } from "@/lib/categories";
import { asset } from "@/lib/media";

export default function CategoryNext({ next }: { next: Category }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-void">
      <Link
        ref={ref}
        href={`/work/${next.slug}`}
        className="reveal block relative h-[70vh] md:h-[80vh] overflow-hidden group no-underline"
      >
        {/* Background media */}
        {next.hero.type === "video" ? (
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-[1500ms] scale-105 group-hover:scale-100"
            src={asset(next.hero.src)}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={asset(next.hero.src)}
            alt={next.hero.alt || next.label}
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-all duration-1200 scale-105 group-hover:scale-100"
            loading="lazy"
          />
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-void/50 group-hover:bg-void/30 transition-colors duration-[1200ms]" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">
          <p
            className="text-gold text-[10px] tracking-[0.4em] uppercase mb-6"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Next Practice
          </p>

          <h2
            className="text-ivory font-light leading-none mb-8"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              letterSpacing: "-0.01em",
            }}
          >
            <em className="italic">{next.label}</em>
          </h2>

          <p
            className="text-mist text-xs tracking-[0.25em] uppercase mb-10"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {next.kicker}
          </p>

          <div className="flex items-center gap-4">
            <span className="w-16 h-px bg-gold transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700" />
            <span
              className="text-gold text-[10px] tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              View →
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
