"use client";

import { useEffect, useRef, useState } from "react";
import type { MediaItem } from "@/lib/categories";
import { asset } from "@/lib/media";

type Props = {
  item: MediaItem;
  className?: string;
  /** aspect ratio override, e.g. "16/9", "4/5" */
  aspect?: string;
  /** add subtle hover zoom */
  zoom?: boolean;
  /** muted autoplay video if it's a video, vs. controls + thumbnail */
  videoBehavior?: "autoplay" | "click-to-play";
  /** lazy-mount video on intersection */
  lazyVideo?: boolean;
  priority?: boolean;
};

export default function MediaFrame({
  item,
  className = "",
  aspect,
  zoom = true,
  videoBehavior = "autoplay",
  lazyVideo = true,
  priority = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(!lazyVideo || priority);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          setRevealed(true);
        }
      },
      { threshold: 0.05, rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const aspectStyle = aspect ? { aspectRatio: aspect } : undefined;

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-shadow ${zoom ? "img-zoom" : ""} ${className} ${
        revealed ? "opacity-100" : "opacity-0"
      }`}
      style={{
        ...aspectStyle,
        transition: "opacity 1.2s cubic-bezier(0.25,0.1,0.25,1)",
      }}
    >
      {item.type === "image" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={asset(item.src)}
          alt={item.alt || ""}
          className="absolute inset-0 w-full h-full object-cover"
          loading={priority ? "eager" : "lazy"}
        />
      ) : inView ? (
        videoBehavior === "autoplay" ? (
          <video
            src={asset(item.src)}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <ClickToPlayVideo src={asset(item.src)} />
        )
      ) : null}

      {/* Caption */}
      {item.caption && (
        <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
          <p
            className="text-mist text-[10px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {item.caption}
          </p>
        </div>
      )}
    </div>
  );
}

function ClickToPlayVideo({ src }: { src: string }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onPlay = () => {
    setPlaying(true);
    setTimeout(() => videoRef.current?.play(), 50);
  };

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop
        playsInline
        preload="metadata"
        controls={playing}
      />
      {!playing && (
        <button
          type="button"
          onClick={onPlay}
          className="absolute inset-0 flex items-center justify-center bg-void/30 hover:bg-void/20 transition-colors duration-500 group cursor-none"
        >
          <span className="play-btn flex items-center justify-center">
            <span
              className="block w-0 h-0 ml-1"
              style={{
                borderTop: "8px solid transparent",
                borderBottom: "8px solid transparent",
                borderLeft: "14px solid #c9a96e",
              }}
            />
          </span>
        </button>
      )}
    </>
  );
}
