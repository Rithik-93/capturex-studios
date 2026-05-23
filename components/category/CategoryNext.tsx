"use client";

import Link from "next/link";
import { useRef } from "react";
import { type Category, getGridPreview } from "@/lib/categories";
import { asset } from "@/lib/media";
import { useReveal } from "@/lib/useReveal";

export default function CategoryNext({ next }: { next: Category }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useReveal(ref);
  const preview = getGridPreview(next);

  return (
    <section className="bg-void">
      <Link
        ref={ref}
        href={`/work/${next.slug}`}
        className="reveal block relative h-[70vh] md:h-[80vh] overflow-hidden group no-underline"
      >
        {/* Background — still preview only (no autoplay video here) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(preview.src)}
          alt={preview.alt}
          className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-all duration-1000 scale-105 group-hover:scale-100"
          loading="lazy"
          decoding="async"
        />

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
