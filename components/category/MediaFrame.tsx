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

/**
 * Derive a poster image URL from a video URL.
 * `https://.../foo.mp4` → `https://.../foo.jpg`
 * Falls back gracefully (onError) if the image doesn't exist.
 */
function videoPoster(videoSrc: string): string {
  return videoSrc.replace(/\.(mp4|webm|mov)$/i, ".jpg");
}

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldMount, setShouldMount] = useState(!lazyVideo || priority);
  const [revealed, setRevealed] = useState(priority);
  const [isPlaying, setIsPlaying] = useState(false);

  // Lazy-mount video on intersection (root margin = 1 viewport ahead).
  useEffect(() => {
    const el = ref.current;
    if (!el || shouldMount) {
      setRevealed(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: "100px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [shouldMount]);

  // Pause autoplaying videos when they leave the viewport — saves CPU.
  useEffect(() => {
    if (item.type !== "video" || videoBehavior !== "autoplay") return;
    const el = ref.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.paused) {
            video.play().catch(() => {});
          }
          setIsPlaying(true);
        } else {
          if (!video.paused) video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [item.type, videoBehavior, shouldMount]);

  const aspectStyle = aspect ? { aspectRatio: aspect } : undefined;
  const isVideo = item.type === "video";

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
      {!isVideo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={asset(item.src)}
          alt={item.alt || ""}
          className="absolute inset-0 w-full h-full object-cover"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
        />
      )}

      {isVideo && shouldMount && videoBehavior === "autoplay" && (
        <>
          {/* Poster (still) shows instantly while video buffers */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={videoPoster(asset(item.src))}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              isPlaying ? "opacity-0" : "opacity-100"
            }`}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <video
            ref={videoRef}
            src={asset(item.src)}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
          />
        </>
      )}

      {isVideo && shouldMount && videoBehavior === "click-to-play" && (
        <ClickToPlayVideo src={asset(item.src)} />
      )}

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
      {/* Poster image while not playing */}
      {!playing && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={videoPoster(src)}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      )}
      <video
        ref={videoRef}
        src={src}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop
        playsInline
        preload="none"
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
