"use client";

import { useRef } from "react";
import MediaFrame from "../MediaFrame";
import type { MediaItem } from "@/lib/categories";
import { useReveal } from "@/lib/useReveal";

/**
 * Editorial Stack — full-bleed alternating chapters.
 * Best for 3–7 items. Each piece gets its own full-width moment with
 * generous whitespace and a small editorial caption rail beside it.
 */
export default function EditorialStack({ media }: { media: MediaItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, [media.length]);

  return (
    <section ref={ref} className="bg-void">
      {media.map((item, i) => {
        const isEven = i % 2 === 0;
        const chapterNum = String(i + 1).padStart(2, "0");
        const isPortrait = item.ratio === "portrait";

        return (
          <article
            key={i}
            className="reveal border-t border-white/[0.04] py-20 md:py-32"
          >
            <div className="max-w-360 mx-auto px-8 md:px-16">
              <div
                className={`grid grid-cols-12 gap-8 items-center ${
                  isEven ? "" : ""
                }`}
              >
                {/* Caption rail */}
                <div
                  className={`col-span-12 md:col-span-3 ${
                    isEven ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <p
                    className="text-mist text-[10px] tracking-[0.3em] uppercase mb-3"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Chapter {chapterNum}
                  </p>
                  <div className="w-10 h-px bg-gold/40 mb-5" />
                  <h3
                    className="text-ivory font-light leading-tight mb-3"
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "clamp(1.3rem, 2vw, 1.7rem)",
                    }}
                  >
                    {item.type === "video" ? (item.caption || "Film") : "Frame"}
                  </h3>
                  {item.caption && item.type === "image" && (
                    <p
                      className="text-mist/80 text-xs tracking-[0.05em] leading-relaxed"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      {item.caption}
                    </p>
                  )}
                  {item.alt && (
                    <p
                      className="text-mist/60 text-[11px] leading-relaxed max-w-[220px]"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      {item.alt}
                    </p>
                  )}
                </div>

                {/* Media */}
                <div
                  className={`col-span-12 md:col-span-9 ${
                    isEven ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <MediaFrame
                    item={item}
                    aspect={isPortrait ? "4/5" : "16/9"}
                    zoom
                    priority={i === 0}
                  />
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
