"use client";

import { useRef } from "react";
import type { Category } from "@/lib/categories";
import { useReveal } from "@/lib/useReveal";

export default function CategoryIntro({ category }: { category: Category }) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="bg-void py-32 md:py-40">
      <div className="max-w-360 mx-auto px-8 md:px-16">
        <div className="grid grid-cols-12 gap-8">
          {/* Left rail: chapter marker */}
          <div className="col-span-12 md:col-span-3 reveal">
            <p
              className="text-gold text-[10px] tracking-[0.3em] uppercase mb-3"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              An Introduction
            </p>
            <div className="w-12 h-px bg-gold/40" />
          </div>

          {/* Right: editorial copy */}
          <div className="col-span-12 md:col-span-8 md:col-start-5">
            <h2
              className="reveal reveal-delay-1 text-ivory font-light leading-[1.1] mb-12"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
              }}
            >
              {category.titlePrefix}{" "}
              <em className="italic">{category.italicTitle}</em>
            </h2>

            <p
              className="reveal reveal-delay-2 text-ivory/80 max-w-2xl"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "16px",
                lineHeight: "1.85",
                letterSpacing: "0.005em",
              }}
            >
              {category.intro}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
