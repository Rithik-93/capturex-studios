"use client";

import { useEffect, useRef } from "react";

export default function Testimonial() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLElement>(".reveal").forEach((node, i) => {
            setTimeout(() => node.classList.add("visible"), i * 150);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#1a1a1a] py-32 relative overflow-hidden">
      {/* Decorative gold line */}
      <div
        className="absolute left-8 md:left-16 top-0 bottom-0 w-px"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.2) 30%, rgba(201,169,110,0.2) 70%, transparent)" }}
      />

      <div className="max-w-[1440px] mx-auto px-8 md:px-16 pl-16 md:pl-32">
        <div className="max-w-4xl">
          {/* Quote mark */}
          <div
            className="reveal text-[#c9a96e]/20 font-light leading-none mb-8 select-none"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "8rem",
              lineHeight: 0.7,
            }}
          >
            &ldquo;
          </div>

          {/* The quote */}
          <blockquote className="reveal reveal-delay-1">
            <p
              className="testimonial-quote text-[#f0ece4]"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
              }}
            >
              They didn&apos;t just photograph our wedding — they made us see
              our love the way we feel it. Every image is a doorway back to
              that day.
            </p>
          </blockquote>

          {/* Attribution */}
          <div className="reveal reveal-delay-2 mt-10 flex items-center gap-6">
            {/* Small gold rule */}
            <div className="w-10 h-px bg-[#c9a96e]" />
            <div>
              <p
                className="text-[#f0ece4] text-sm tracking-[0.08em]"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Priya &amp; Arjun Mehta
              </p>
              <p
                className="text-[#8a8a80] text-[11px] tracking-[0.2em] uppercase mt-1"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Wedding · Udaipur · December 2024
              </p>
            </div>
          </div>
        </div>

        {/* Client name strip */}
        <div className="reveal reveal-delay-3 mt-24 pt-12 border-t border-white/[0.06]">
          <p
            className="text-[#8a8a80] text-[10px] tracking-[0.25em] uppercase mb-8"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Trusted by
          </p>
          <div className="flex flex-wrap gap-x-10 gap-y-4 items-center">
            {[
              "The Leela Palace",
              "Taj Falaknuma",
              "ITC Grand",
              "Ritz-Carlton",
              "Oberoi Hotels",
              "Sabyasachi Studios",
            ].map((name) => (
              <span
                key={name}
                className="text-[#8a8a80]/60 hover:text-[#8a8a80] transition-colors duration-300 text-xs tracking-[0.15em] uppercase"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
