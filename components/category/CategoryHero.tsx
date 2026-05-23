"use client";

import { useEffect, useRef, useState } from "react";
import type { Category } from "@/lib/categories";
import { asset } from "@/lib/media";

export default function CategoryHero({ category }: { category: Category }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  const isVideo = category.hero.type === "video";
  const heroSrc = asset(category.hero.src);

  // rAF-throttled parallax; skip work once hero is off-screen
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    let lastY = 0;
    let ticking = false;

    const update = () => {
      el.style.transform = `translate3d(0, ${lastY * 0.3}px, 0)`;
      ticking = false;
    };

    const onScroll = () => {
      lastY = window.scrollY;
      if (lastY > window.innerHeight * 1.2) return;
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lazy-attach video src at idle so it doesn't block the LCP image/poster
  useEffect(() => {
    if (!isVideo) return;
    const video = videoRef.current;
    if (!video) return;

    const startLoad = () => {
      if (!video.src) {
        video.src = heroSrc;
        video.load();
        video
          .play()
          .then(() => setVideoReady(true))
          .catch(() => setVideoReady(true));
      }
    };

    const idle =
      (window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number })
        .requestIdleCallback;
    if (idle) {
      idle(startLoad, { timeout: 1500 });
    } else {
      setTimeout(startLoad, 250);
    }
  }, [isVideo, heroSrc]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Background media */}
      <div
        ref={heroRef}
        className="absolute inset-0 scale-110"
        style={{ willChange: "transform" }}
      >
        {isVideo ? (
          <>
            {/* Poster fallback while video loads */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroSrc.replace(/\.mp4$/i, ".jpg")}
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                videoReady ? "opacity-0" : "opacity-100"
              }`}
              onError={(e) => {
                // If no poster exists, just hide it — video poster attr will take over
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
            />
          </>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={heroSrc}
            alt={category.hero.alt || category.label}
            fetchPriority="high"
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
