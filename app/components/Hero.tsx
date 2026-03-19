"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const [showHeadline, setShowHeadline] = useState(false);
  const [showRule, setShowRule] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Sequence: sweep 0-750ms, then content staggers in
    const t1 = setTimeout(() => setShowHeadline(true), 800);
    const t2 = setTimeout(() => setShowRule(true), 1200);
    const t3 = setTimeout(() => setShowTagline(true), 1650);
    const t4 = setTimeout(() => setShowButtons(true), 1850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className="relative overflow-hidden -mt-20 min-h-screen flex flex-col items-center justify-center"
      style={{ background: "var(--off-white)" }}
    >
      {/* Charcoal overlay — skewed parallelogram sweeps off to the right on mount */}
      <div
        className="absolute inset-y-0 pointer-events-none"
        style={{
          left: "-20%",
          right: "-20%",
          background: "var(--charcoal)",
          animation: "sweep-across 0.75s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 w-full max-w-5xl mx-auto text-center px-6 md:px-8"
        style={{ paddingTop: "6rem", paddingBottom: "8rem" }}
      >
        {/* Headline block */}
        <div className="mb-6">
          {/* Line 1 — eyebrow */}
          <div
            style={{
              opacity: showHeadline ? 1 : 0,
              transform: showHeadline ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
              transitionDelay: "0ms",
            }}
          >
            <span
              className="block mb-3 text-sm md:text-base font-semibold tracking-widest uppercase"
              style={{
                color: "var(--red)",
                fontFamily: "var(--font-archivo-black), sans-serif",
              }}
            >
              CHRISTCHURCH'S
            </span>
          </div>

          {/* Line 2 — ROAD SWEEPING */}
          <div
            style={{
              opacity: showHeadline ? 1 : 0,
              transform: showHeadline ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
              transitionDelay: "150ms",
            }}
          >
            <span
              className="block leading-none"
              style={{
                fontFamily: "var(--font-archivo-black), sans-serif",
                fontSize: "clamp(2.75rem, 9vw, 6rem)",
                letterSpacing: "-0.03em",
                color: "var(--charcoal)",
              }}
            >
              ROAD SWEEPING
            </span>
          </div>

          {/* Line 3 — SPECIALISTS */}
          <div
            style={{
              opacity: showHeadline ? 1 : 0,
              transform: showHeadline ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
              transitionDelay: "300ms",
            }}
          >
            <span
              className="block leading-none"
              style={{
                fontFamily: "var(--font-archivo-black), sans-serif",
                fontSize: "clamp(2.75rem, 9vw, 6rem)",
                letterSpacing: "-0.03em",
                color: "var(--charcoal)",
              }}
            >
              SPECIALISTS
            </span>
          </div>
        </div>

        {/* Red rule */}
        <div className="flex justify-center mb-7">
          <div
            style={{
              width: 80,
              height: 2,
              background: "var(--red)",
              transformOrigin: "0% 50%",
              transform: showRule ? "scaleX(1)" : "scaleX(0)",
              transition: "transform 0.45s ease",
            }}
          />
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: showTagline ? 1 : 0,
            transform: showTagline ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <p
            className="text-base md:text-lg mb-10"
            style={{ color: "var(--charcoal)", lineHeight: 1.7 }}
          >
            Reliable. Efficient. Trusted.
          </p>
        </div>

        {/* Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{
            opacity: showButtons ? 1 : 0,
            transform: showButtons ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <Link
            href="/contact"
            className="btn-red active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2"
          >
            Get a Quote
          </Link>
          <Link
            href="/services"
            className="btn-outline active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2"
          >
            Our Services
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{
          opacity: scrolled ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      >
        <div style={{ animation: "bounce-indicator 1.8s ease-in-out infinite" }}>
          <ChevronDown size={26} strokeWidth={2} style={{ color: "var(--red)" }} />
        </div>
      </div>
    </section>
  );
}
