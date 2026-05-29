"use client";

import { useEffect, useRef } from "react";

const PROJECTS = [
  {
    id: "01",
    category: "Wedding · Goa · 2025",
    title: "Aarav & Meera",
    description:
      "A three-day wedding woven through candlelit courtyards and open skies. We arrived before dawn on the last day to catch the light no one else waited for.",
    aspect: "landscape",
    gradient: "from-[#2a1f1a] to-[#1a1410]",
    accentGradient: "radial-gradient(ellipse 60% 80% at 70% 30%, #3d2a1a 0%, #1a1410 100%)",
  },
  {
    id: "02",
    category: "Fashion · Hyderabad · 2025",
    title: "Obsidian Editorial",
    description:
      "Shot over two days in an industrial archive space in Secunderabad. The brief: make fashion feel like archaeology.",
    aspect: "portrait",
    gradient: "from-[#1a1a22] to-[#0f0f14]",
    accentGradient: "radial-gradient(ellipse 60% 60% at 30% 60%, #252535 0%, #0f0f14 100%)",
  },
  {
    id: "03",
    category: "Corporate Film · Mumbai · 2024",
    title: "The Founders Series",
    description:
      "A six-part documentary series profiling the people building India's next generation of infrastructure companies. Intimate, unhurried, honest.",
    aspect: "landscape",
    gradient: "from-[#1a1e1a] to-[#101410]",
    accentGradient: "radial-gradient(ellipse 70% 50% at 50% 40%, #1e2a1e 0%, #101410 100%)",
  },
];

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
}

function ProjectRow({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  useReveal(rowRef as React.RefObject<HTMLElement>);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={rowRef}
      className={`reveal flex flex-col md:flex-row items-stretch gap-0 border-b border-white/[0.06] ${
        isEven ? "" : "md:flex-row-reverse"
      }`}
    >
      {/* Image block */}
      <div
        className={`img-zoom relative overflow-hidden ${
          project.aspect === "portrait"
            ? "md:w-[45%] aspect-[4/5]"
            : "md:w-[55%] aspect-[16/10]"
        }`}
      >
        <div
          className="absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
          style={{ background: project.accentGradient }}
        />

        {/* Project number watermark */}
        <span
          className="absolute top-6 left-6 text-white/10 font-light select-none"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(4rem, 10vw, 8rem)",
            lineHeight: 1,
          }}
        >
          {project.id}
        </span>

        {/* Category tag */}
        <div className="absolute bottom-6 left-6">
          <span
            className="text-[#8a8a80] text-[10px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Text block */}
      <div
        className={`flex-1 flex flex-col justify-center p-10 md:p-16 lg:p-24 ${
          isEven ? "md:pl-16" : "md:pr-16"
        }`}
      >
        <p
          className="text-[#c9a96e] text-[10px] tracking-[0.25em] uppercase mb-6"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          Featured Project
        </p>

        <h2
          className="text-[#f0ece4] font-light mb-6 leading-[1.1]"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
          }}
        >
          {project.title}
        </h2>

        <p
          className="text-[#8a8a80] leading-relaxed mb-10 max-w-sm"
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "14px",
            lineHeight: "1.8",
          }}
        >
          {project.description}
        </p>

        <a href="#work" className="link-gold self-start">
          View Project
        </a>
      </div>
    </div>
  );
}

export default function FeaturedWork() {
  const headingRef = useRef<HTMLDivElement>(null);
  useReveal(headingRef as React.RefObject<HTMLElement>);

  return (
    <section id="work" className="bg-[#1a1a1a]">
      {/* Section header */}
      <div
        ref={headingRef}
        className="reveal max-w-[1440px] mx-auto px-8 md:px-16 pt-24 pb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
      >
        <div>
          <p
            className="text-[#8a8a80] text-[10px] tracking-[0.25em] uppercase mb-4"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Selected Work
          </p>
          <h2
            className="text-[#f0ece4] font-light leading-tight"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
            }}
          >
            Work that speaks
            <br />
            <em className="italic">before words do.</em>
          </h2>
        </div>

        <a href="#work" className="link-gold self-start md:self-end mb-1">
          All Projects
        </a>
      </div>

      <div className="divider" />

      {/* Projects */}
      <div>
        {PROJECTS.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
