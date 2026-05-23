"use client";

import { useEffect } from "react";

/**
 * Shared IntersectionObserver for scroll-reveal animations.
 *
 * Instead of every component creating its own observer (we had 13+),
 * we lazily create ONE singleton observer and register elements with it.
 * When an element scrolls into view, it gets the `visible` class and is
 * unobserved.
 *
 * Components opt in either by:
 *   - using the `useReveal` hook with a ref, OR
 *   - calling `observeReveal(el)` directly on a DOM node.
 *
 * Stagger delays continue to work via per-element CSS:
 *   <div className="reveal reveal-delay-2" />
 */

let sharedObserver: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof window === "undefined") return null;
  if (sharedObserver) return sharedObserver;

  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          sharedObserver!.unobserve(entry.target);
        }
      }
    },
    {
      // Trigger slightly before the element fully enters the viewport
      // so the fade-in feels natural instead of late.
      threshold: 0.08,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  return sharedObserver;
}

export function observeReveal(el: Element | null) {
  if (!el) return;
  const obs = getObserver();
  if (obs) obs.observe(el);
}

/**
 * Hook that watches a container ref and observes every `.reveal`
 * descendant inside it with the shared observer.
 *
 * @param ref       container ref whose `.reveal` children should fade in
 * @param deps      optional reactive deps (e.g. media list length)
 */
export function useReveal(
  ref: React.RefObject<HTMLElement | null>,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    // If the root itself is `.reveal`, observe it too.
    const targets: Element[] = [];
    if (root.classList.contains("reveal")) targets.push(root);
    root.querySelectorAll<HTMLElement>(".reveal:not(.visible)").forEach((el) =>
      targets.push(el)
    );

    targets.forEach(observeReveal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
