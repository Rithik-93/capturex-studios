"use client";

import { useEffect, useRef, useState } from "react";

const HERO_VIDEO =
  "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/corporate/tech_summit.mp4";
const HERO_POSTER =
  "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/Thumbnail%20.jpg";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  // rAF-throttled parallax
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let lastY = 0;
    let ticking = false;

    const update = () => {
      hero.style.transform = `translate3d(0, ${lastY * 0.35}px, 0)`;
      ticking = false;
    };

    const onScroll = () => {
      lastY = window.scrollY;
      if (lastY > window.innerHeight) return; // stop work when hero off-screen
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Defer real video load to idle time so it never blocks paint/LCP
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startLoad = () => {
      if (!video.src) {
        video.src = HERO_VIDEO;
        video.load();
        video
          .play()
          .then(() => setVideoReady(true))
          .catch(() => setVideoReady(true)); // autoplay may be blocked; we still want the poster gone-state to fall back gracefully
      }
    };

    // Prefer requestIdleCallback; fall back to a short timeout
    const idle =
      (window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number })
        .requestIdleCallback;
    if (idle) {
      idle(startLoad, { timeout: 1500 });
    } else {
      setTimeout(startLoad, 250);
    }
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]">
      <div
        ref={heroRef}
        className="absolute inset-0 scale-110"
        style={{ willChange: "transform" }}
      >
        {/* Poster image — shown instantly, fades out when video plays */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_POSTER}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            videoReady ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Hero video — src set lazily via JS to avoid blocking initial paint */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          poster={HERO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        />

        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      {/* Dark vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 120% 120% at 50% 50%, transparent 50%, rgba(10,10,10,0.6) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, transparent 30%, transparent 60%, rgba(10,10,10,0.7) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between px-8 md:px-16 max-w-360 mx-auto w-full">
        <div className="pt-32" />

        <div className="flex flex-col gap-6 max-w-3xl">
          <p
            className="text-mist text-xs tracking-[0.25em] uppercase"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Photography &amp; Film · Hyderabad
          </p>

          <h1
            className="font-light text-ivory leading-[1.05]"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(3.5rem, 9vw, 8rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Photography
            <br />
            <em className="italic">for life&apos;s</em>
            <br />
            defining moments.
          </h1>

          <div className="flex items-center gap-8 mt-4">
            <a href="#work" className="cta-primary">
              <span>View Work</span>
              <span
                className="text-gold"
                style={{ fontSize: "18px", lineHeight: 1 }}
              >
                →
              </span>
            </a>
            <a href="#inquire" className="link-gold">
              Begin an inquiry
            </a>
          </div>
        </div>

        <div className="flex items-end justify-between pb-10">
          <div className="flex flex-col items-center gap-3">
            <div className="scroll-line" />
            <span
              className="text-mist text-[10px] tracking-[0.25em] uppercase"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Scroll
            </span>
          </div>

          <p
            className="text-mist text-xs tracking-[0.15em] uppercase text-right hidden md:block"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Weddings · Pre-Wedding · Food · Product
            <br />
            Events · Sports · Corporate Film
          </p>
        </div>
      </div>

      {/* False floor */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[8vh] pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(26,26,26,0.5))",
        }}
      />
    </section>
  );
}
