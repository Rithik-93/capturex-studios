"use client";

import { useRef, useState } from "react";
import { useReveal } from "@/lib/useReveal";

const PROJECT_TYPES = [
  "Wedding & Pre-Wedding",
  "Fashion & Editorial",
  "Food Photography",
  "Product Photography",
  "Event & Birthday",
  "Sports",
  "Corporate Film",
  "Other",
];

const BUDGET_RANGES = [
  "Under ₹50,000",
  "₹50k – ₹1 Lakh",
  "₹1L – ₹3L",
  "₹3L – ₹5L",
  "₹5L+",
];

export default function Inquire() {
  const ref = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  useReveal(ref);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section ref={ref} id="inquire" className="bg-[#1a1a1a] py-32">
      <div className="divider" />
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          {/* Left: copy */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="reveal">
                <p
                  className="text-[#c9a96e] text-[10px] tracking-[0.25em] uppercase mb-6"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Begin an Inquiry
                </p>
              </div>

              <h2
                className="reveal reveal-delay-1 text-[#f0ece4] font-light leading-tight mb-8"
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                }}
              >
                Let&apos;s create
                <br />
                <em className="italic">something together.</em>
              </h2>

              <p
                className="reveal reveal-delay-2 text-[#8a8a80] leading-relaxed max-w-sm mb-16"
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "14px",
                  lineHeight: "1.85",
                }}
              >
                We take on a limited number of projects each season so we can
                give every shoot the attention it deserves. Tell us about your
                vision — we respond within 48 hours.
              </p>
            </div>

            {/* Contact details */}
            <div className="reveal reveal-delay-3 space-y-6 border-t border-white/[0.06] pt-10">
              {[
                { label: "Email", value: "hello@capturex.in" },
                { label: "WhatsApp", value: "+91 98765 43210" },
                { label: "Studio", value: "Banjara Hills, Hyderabad" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-6">
                  <p
                    className="text-[#8a8a80] text-[10px] tracking-[0.2em] uppercase w-20 pt-1"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-[#f0ece4] text-sm"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal reveal-delay-2">
            {submitted ? (
              <div className="h-full flex flex-col items-start justify-center py-20">
                <div
                  className="text-[#c9a96e] mb-6"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontStyle: "italic",
                  }}
                >
                  Thank you.
                </div>
                <p
                  className="text-[#8a8a80] leading-relaxed max-w-sm"
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "14px",
                    lineHeight: "1.8",
                  }}
                >
                  We&apos;ve received your inquiry and will be in touch within
                  48 hours. In the meantime, feel free to explore more of our
                  work.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label
                      className="block text-[#8a8a80] text-[10px] tracking-[0.2em] uppercase mb-3"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      className="luxury-input"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-[#8a8a80] text-[10px] tracking-[0.2em] uppercase mb-3"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="luxury-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label
                      className="block text-[#8a8a80] text-[10px] tracking-[0.2em] uppercase mb-3"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      Project Type
                    </label>
                    <select required className="luxury-select">
                      <option value="" disabled selected>
                        Select a category
                      </option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      className="block text-[#8a8a80] text-[10px] tracking-[0.2em] uppercase mb-3"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      Budget Range
                    </label>
                    <select className="luxury-select">
                      <option value="" disabled selected>
                        Approximate budget
                      </option>
                      {BUDGET_RANGES.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label
                      className="block text-[#8a8a80] text-[10px] tracking-[0.2em] uppercase mb-3"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      Date / Timeline
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. March 2026"
                      className="luxury-input"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-[#8a8a80] text-[10px] tracking-[0.2em] uppercase mb-3"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="City or venue"
                      className="luxury-input"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-[#8a8a80] text-[10px] tracking-[0.2em] uppercase mb-3"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Tell us about your vision
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Share the mood, the setting, what matters most to you. The more you tell us, the better we can prepare."
                    className="luxury-input resize-none"
                    style={{ borderBottom: "1px solid rgba(240,236,228,0.2)" }}
                  />
                </div>

                <div className="pt-4">
                  <button type="submit" className="cta-primary">
                    <span>Send Inquiry</span>
                    <span className="text-[#c9a96e]" style={{ fontSize: "18px" }}>
                      →
                    </span>
                  </button>
                  <p
                    className="text-[#8a8a80] text-[11px] tracking-[0.08em] mt-4"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    We respond within 48 hours. No automated replies.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
