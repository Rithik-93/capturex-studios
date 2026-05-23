"use client";

import { useRef } from "react";
import MediaFrame from "../MediaFrame";
import type { MediaItem } from "@/lib/categories";
import { useReveal } from "@/lib/useReveal";

/**
 * Masonry Mixed — undulating editorial rhythm.
 *
 * Strategy: deterministic sequencing that mixes scale to keep
 * dopamine loop firing (guide ref: Variable Reward, Sequencing).
 *
 * Pattern (repeats every 7 items):
 *   1. Full-bleed wide      (16:9)
 *   2-3. Side-by-side pair  (4:5 + 4:5)
 *   4. Full-bleed wide      (16:9)
 *   5. Single tight detail  (1:1)
 *   6-7. Triptych row       (4:5 x 3)  — only if enough items remain
 *
 * Final two slots: a pull-quote break or wide closer.
 */
export default function MasonryMixed({ media }: { media: MediaItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, [media.length]);

  // Build editorial blocks adaptively from media count
  const blocks = buildBlocks(media);

  return (
    <section ref={ref} className="bg-void pb-32">
      <div className="max-w-360 mx-auto">
        {blocks.map((block, i) => {
          switch (block.kind) {
            case "fullbleed":
              return (
                <div
                  key={i}
                  className="reveal px-0 md:px-16 mb-2 md:mb-4"
                  style={{ transitionDelay: `${(i % 4) * 60}ms` }}
                >
                  <MediaFrame
                    item={block.items[0]}
                    aspect="16/9"
                    zoom
                    priority={i === 0}
                  />
                </div>
              );
            case "pair":
              return (
                <div
                  key={i}
                  className="reveal grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 px-0 md:px-16 mb-2 md:mb-4"
                >
                  {block.items.map((item, j) => (
                    <MediaFrame key={j} item={item} aspect="4/5" zoom />
                  ))}
                </div>
              );
            case "detail":
              return (
                <div
                  key={i}
                  className="reveal max-w-2xl mx-auto px-8 md:px-16 my-12 md:my-20"
                >
                  <MediaFrame item={block.items[0]} aspect="1/1" zoom />
                </div>
              );
            case "triptych":
              return (
                <div
                  key={i}
                  className="reveal grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 px-0 md:px-16 mb-2 md:mb-4"
                >
                  {block.items.map((item, j) => (
                    <MediaFrame key={j} item={item} aspect="4/5" zoom />
                  ))}
                </div>
              );
            case "quote":
              return <PullQuote key={i} text={block.text} />;
            default:
              return null;
          }
        })}
      </div>
    </section>
  );
}

type Block =
  | { kind: "fullbleed"; items: MediaItem[] }
  | { kind: "pair"; items: MediaItem[] }
  | { kind: "detail"; items: MediaItem[] }
  | { kind: "triptych"; items: MediaItem[] }
  | { kind: "quote"; text: string };

function buildBlocks(media: MediaItem[]): Block[] {
  // Separate by orientation for smarter packing
  const queue = [...media];
  const blocks: Block[] = [];

  const takeOne = (preferred?: MediaItem["ratio"]) => {
    if (preferred) {
      const idx = queue.findIndex((m) => m.ratio === preferred);
      if (idx >= 0) return queue.splice(idx, 1)[0];
    }
    return queue.shift();
  };

  // Always lead with a wide hero
  const lead = takeOne("landscape") || queue.shift();
  if (lead) blocks.push({ kind: "fullbleed", items: [lead] });

  let quoteInserted = false;
  while (queue.length > 0) {
    // Pair if we have at least 2 portraits (or any 2)
    const portraits = queue.filter((m) => m.ratio === "portrait");
    if (portraits.length >= 2 && queue.length >= 2) {
      const a = takeOne("portrait")!;
      const b = takeOne("portrait")!;
      blocks.push({ kind: "pair", items: [a, b] });

      // Mid-sequence pull quote (only once, around the middle)
      if (!quoteInserted && blocks.length >= 3 && queue.length >= 2) {
        quoteInserted = true;
        blocks.push({
          kind: "quote",
          text:
            "We don't shoot what's happening — we shoot what it feels like to be there.",
        });
      }
      continue;
    }

    // Triptych if 3 portraits left
    if (portraits.length >= 3) {
      const items = [
        takeOne("portrait")!,
        takeOne("portrait")!,
        takeOne("portrait")!,
      ];
      blocks.push({ kind: "triptych", items });
      continue;
    }

    // Lone wide → full-bleed
    const next = queue.shift()!;
    if (next.ratio === "portrait") {
      // Pair with another if any, else detail-tight
      const partner = queue.shift();
      if (partner) {
        blocks.push({ kind: "pair", items: [next, partner] });
      } else {
        blocks.push({ kind: "detail", items: [next] });
      }
    } else {
      blocks.push({ kind: "fullbleed", items: [next] });
    }
  }

  return blocks;
}

function PullQuote({ text }: { text: string }) {
  return (
    <div className="my-24 md:my-32 px-8 md:px-16">
      <div className="max-w-3xl mx-auto text-center">
        <div
          className="text-gold/30 font-light leading-none mb-6 select-none"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "5rem",
            lineHeight: 0.6,
          }}
        >
          &ldquo;
        </div>
        <blockquote
          className="text-ivory font-light italic leading-snug"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
          }}
        >
          {text}
        </blockquote>
      </div>
    </div>
  );
}
