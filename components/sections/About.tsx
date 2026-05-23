"use client";

import { useEffect, useRef } from "react";

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLElement>(".reveal").forEach((node, i) => {
            setTimeout(() => node.classList.add("visible"), i * 120);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="about" className="bg-[#141414] py-32">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Portrait block */}
          <div className="reveal order-2 md:order-1">
            <div
              className="img-zoom relative overflow-hidden"
              style={{ aspectRatio: "3/4" }}
            >
              {/* Founder portrait */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://capturex2026.sgp1.cdn.digitaloceanspaces.com/Thumbnail%20.jpg"
                alt="Founder portrait"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />

              {/* Subtle bottom gradient for label legibility */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 60%, rgba(10,10,10,0.75) 100%)",
                }}
              />

              {/* Subtle gold rim light */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-overlay"
                style={{
                  background:
                    "linear-gradient(135deg, transparent 60%, rgba(201,169,110,0.15) 100%)",
                }}
              />

              {/* Founder label */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <p
                  className="text-ivory text-[10px] tracking-[0.2em] uppercase"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Founder &amp; Lead Photographer
                </p>
              </div>
            </div>
          </div>

          {/* Text block */}
          <div className="order-1 md:order-2 flex flex-col justify-center">
            <div className="reveal">
              <p
                className="text-[#c9a96e] text-[10px] tracking-[0.25em] uppercase mb-8"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                The Studio
              </p>
            </div>

            <h2
              className="reveal reveal-delay-1 text-[#f0ece4] font-light leading-tight mb-8"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
              }}
            >
              We don&apos;t document
              <br />
              <em className="italic">moments — we make them.</em>
            </h2>

            <div
              className="reveal reveal-delay-2 space-y-5 text-[#8a8a80] mb-10"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "14px",
                lineHeight: "1.85",
              }}
            >
              <p>
                CaptureX started as a quiet obsession with the pause between
                what happens and what it means. We&apos;ve spent a decade
                learning how to photograph that pause.
              </p>
              <p>
                Our work spans seven disciplines not because we couldn&apos;t
                choose, but because the same philosophy threads through all of
                them: restraint, patience, and an absolute refusal to take the
                obvious shot.
              </p>
              <p>
                Based in Hyderabad. Available everywhere a good story is waiting
                to be told.
              </p>
            </div>

            <div className="reveal reveal-delay-3 flex flex-col sm:flex-row gap-6 items-start">
              <a href="#about" className="cta-primary">
                <span>Our Story</span>
              </a>
              <a href="#inquire" className="link-gold self-center">
                Work with us
              </a>
            </div>

            {/* Stats */}
            <div className="reveal reveal-delay-4 mt-16 pt-10 border-t border-white/[0.06] grid grid-cols-3 gap-8">
              {[
                { num: "10+", label: "Years" },
                { num: "300+", label: "Projects" },
                { num: "7", label: "Disciplines" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-[#f0ece4] font-light mb-1"
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                    }}
                  >
                    {stat.num}
                  </p>
                  <p
                    className="text-[#8a8a80] text-[10px] tracking-[0.2em] uppercase"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
