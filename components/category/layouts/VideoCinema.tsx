"use client";

import { useEffect, useRef } from "react";
import MediaFrame from "../MediaFrame";
import type { MediaItem } from "@/lib/categories";

/**
 * VideoCinema — full-bleed letterboxed films, vertical stack.
 * Best for video-heavy or video-only categories (sports).
 * Each film gets its own black "screen" with title cards above and below.
 */
export default function VideoCinema({ media }: { media: MediaItem[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    root.querySelectorAll<HTMLElement>(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [media]);

  return (
    <section ref={ref} className="bg-[#0a0a0a]">
      {media.map((item, i) => (
        <article
          key={i}
          className="reveal border-t border-white/[0.04] py-20 md:py-28"
        >
          <div className="max-w-360 mx-auto px-8 md:px-16">
            {/* Title block above the film */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <p
                  className="text-gold text-[10px] tracking-[0.3em] uppercase mb-4"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Film {String(i + 1).padStart(2, "0")} /{" "}
                  {String(media.length).padStart(2, "0")}
                </p>
                <h3
                  className="text-ivory font-light leading-tight"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                  }}
                >
                  {item.caption || "Untitled Film"}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-10 h-px bg-gold/40" />
                <span
                  className="text-mist text-[10px] tracking-[0.25em] uppercase"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Watch · Muted Loop
                </span>
              </div>
            </div>

            {/* Film frame — cinematic 21:9 with letterbox */}
            <div className="relative">
              <div
                className="absolute -inset-x-4 -inset-y-2 bg-gold/[0.03] blur-2xl pointer-events-none"
                aria-hidden
              />
              <MediaFrame
                item={item}
                aspect="21/9"
                zoom={false}
                priority={i === 0}
              />
            </div>

            {/* Credit line under each film */}
            <div className="mt-6 flex items-center justify-between">
              <span
                className="text-mist text-[10px] tracking-[0.25em] uppercase"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Direction · Cinematography · Edit
              </span>
              <span
                className="text-mist text-[10px] tracking-[0.25em] uppercase"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                CaptureX Studio · 2025
              </span>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
