"use client";

import { useEffect, useRef } from "react";

// CSS selector for elements that should expand the cursor on hover.
const HOVER_SELECTOR = "a, button, .category-card, .play-btn, .cta-primary, .img-zoom";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices — no cursor to follow
    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia("(hover: none)").matches ||
        "ontouchstart" in window);
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId = 0;
    let needsUpdate = false;

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      // Keep animating while pointer is still close — stop when it has settled
      const dx = mouseX - ringX;
      const dy = mouseY - ringY;
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1 || needsUpdate) {
        needsUpdate = false;
        rafId = requestAnimationFrame(animate);
      } else {
        rafId = 0;
      }
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      needsUpdate = true;
      if (!rafId) rafId = requestAnimationFrame(animate);
    };

    // Event delegation — single pair of listeners, no MutationObserver needed.
    // pointerover/out bubble, unlike mouseenter/leave.
    const onOver = (e: Event) => {
      const target = e.target as Element | null;
      if (target && target.closest && target.closest(HOVER_SELECTOR)) {
        dot.classList.add("hover");
        ring.classList.add("hover");
      }
    };

    const onOut = (e: Event) => {
      const target = e.target as Element | null;
      const related = (e as PointerEvent).relatedTarget as Element | null;
      if (target && target.closest && target.closest(HOVER_SELECTOR)) {
        // Only clear when leaving the hover-target (and not entering another)
        if (!related || !related.closest || !related.closest(HOVER_SELECTOR)) {
          dot.classList.remove("hover");
          ring.classList.remove("hover");
        }
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
