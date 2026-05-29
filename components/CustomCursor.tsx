"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      rafId = requestAnimationFrame(animate);
    };

    const onEnterHover = () => {
      dot.classList.add("hover");
      ring.classList.add("hover");
    };

    const onLeaveHover = () => {
      dot.classList.remove("hover");
      ring.classList.remove("hover");
    };

    const attachHover = () => {
      const targets = document.querySelectorAll(
        "a, button, .category-card, .play-btn, .cta-primary, .img-zoom"
      );
      targets.forEach((el) => {
        el.addEventListener("mouseenter", onEnterHover);
        el.addEventListener("mouseleave", onLeaveHover);
      });
    };

    document.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(animate);

    // Attach on mount and re-attach on DOM changes
    attachHover();
    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
