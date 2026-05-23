"use client";

import { useRef } from "react";
import MediaFrame from "../MediaFrame";
import type { MediaItem } from "@/lib/categories";
import { useReveal } from "@/lib/useReveal";

/**
 * ProductClean — controlled grid on darker canvas.
 * Best for product / commercial work where consistency reads as premium.
 * Lead video gets a full-bleed cinematic slot; stills sit in a strict
 * 2-col grid with even gaps on a deeper background.
 */
export default function ProductClean({ media }: { media: MediaItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, [media.length]);

  const videos = media.filter((m) => m.type === "video");
  const images = media.filter((m) => m.type === "image");

  return (
    <section ref={ref} className="bg-[#0f0f0f] pb-32">
      {/* Lead film */}
      {videos[0] && (
        <div className="reveal pt-20 pb-12">
          <div className="max-w-360 mx-auto px-8 md:px-16 mb-8">
            <p
              className="text-gold text-[10px] tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Lead Film
            </p>
          </div>
          <div className="px-0 md:px-16">
            <MediaFrame item={videos[0]} aspect="16/9" zoom={false} priority />
          </div>
        </div>
      )}

      {/* Stills grid */}
      {images.length > 0 && (
        <div className="reveal pt-20">
          <div className="max-w-360 mx-auto px-8 md:px-16 mb-10 flex items-end justify-between">
            <p
              className="text-gold text-[10px] tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Stills · {String(images.length).padStart(2, "0")}
            </p>
            <span className="text-mist text-[10px] tracking-[0.25em] uppercase">
              Studio · Daylight
            </span>
          </div>
          <div className="max-w-360 mx-auto px-8 md:px-16">
            <div
              className={`grid gap-4 md:gap-6 ${
                images.length === 1
                  ? "grid-cols-1 max-w-2xl mx-auto"
                  : images.length === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {images.map((item, i) => (
                <MediaFrame
                  key={i}
                  item={item}
                  aspect={item.ratio === "landscape" ? "4/3" : "4/5"}
                  zoom
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Additional films */}
      {videos.length > 1 && (
        <div className="reveal pt-24">
          <div className="max-w-360 mx-auto px-8 md:px-16 mb-10">
            <p
              className="text-gold text-[10px] tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              More Films
            </p>
          </div>
          <div className="space-y-8 px-0 md:px-16">
            {videos.slice(1).map((item, i) => (
              <MediaFrame key={i} item={item} aspect="16/9" zoom={false} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
