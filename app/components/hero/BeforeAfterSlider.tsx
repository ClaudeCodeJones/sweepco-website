"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Chip seal aggregate scattered across the before-side surface.
// 200x200 px tile with ~80 chips, varied size (rx 2.5-4.5, ry 1.5-2.8),
// rotation, and colour to break up any obvious tiling repeat.
const chips = [
  // Row 1
  { cx: 12,  cy: 8,   rx: 4.5, ry: 2.5, rot: 35,  fill: "#8B7355" },
  { cx: 34,  cy: 15,  rx: 3.0, ry: 1.8, rot: 120, fill: "#6B5A45" },
  { cx: 58,  cy: 5,   rx: 3.5, ry: 2.0, rot: 70,  fill: "#A08060" },
  { cx: 78,  cy: 18,  rx: 2.5, ry: 1.5, rot: 45,  fill: "#5A4A38" },
  { cx: 95,  cy: 8,   rx: 4.0, ry: 2.5, rot: 160, fill: "#8B7355" },
  { cx: 115, cy: 14,  rx: 3.5, ry: 2.0, rot: 85,  fill: "#6B5A45" },
  { cx: 138, cy: 6,   rx: 2.5, ry: 1.5, rot: 30,  fill: "#A08060" },
  { cx: 158, cy: 20,  rx: 4.0, ry: 2.5, rot: 145, fill: "#8B7355" },
  { cx: 178, cy: 10,  rx: 3.0, ry: 2.0, rot: 65,  fill: "#5A4A38" },
  { cx: 196, cy: 18,  rx: 3.5, ry: 1.8, rot: 110, fill: "#6B5A45" },
  // Row 2
  { cx: 8,   cy: 35,  rx: 3.0, ry: 1.8, rot: 55,  fill: "#A08060" },
  { cx: 25,  cy: 42,  rx: 4.5, ry: 2.8, rot: 175, fill: "#5A4A38" },
  { cx: 48,  cy: 32,  rx: 2.5, ry: 1.5, rot: 90,  fill: "#8B7355" },
  { cx: 68,  cy: 45,  rx: 3.5, ry: 2.0, rot: 25,  fill: "#6B5A45" },
  { cx: 88,  cy: 38,  rx: 4.0, ry: 2.3, rot: 135, fill: "#A08060" },
  { cx: 108, cy: 42,  rx: 3.0, ry: 1.8, rot: 60,  fill: "#8B7355" },
  { cx: 128, cy: 35,  rx: 2.5, ry: 1.5, rot: 170, fill: "#5A4A38" },
  { cx: 148, cy: 44,  rx: 4.0, ry: 2.5, rot: 40,  fill: "#6B5A45" },
  { cx: 168, cy: 36,  rx: 3.5, ry: 2.0, rot: 100, fill: "#A08060" },
  { cx: 188, cy: 43,  rx: 3.0, ry: 1.8, rot: 155, fill: "#8B7355" },
  // Row 3
  { cx: 15,  cy: 60,  rx: 4.0, ry: 2.5, rot: 80,  fill: "#6B5A45" },
  { cx: 38,  cy: 68,  rx: 2.5, ry: 1.5, rot: 15,  fill: "#5A4A38" },
  { cx: 55,  cy: 58,  rx: 3.5, ry: 2.2, rot: 140, fill: "#8B7355" },
  { cx: 75,  cy: 65,  rx: 3.0, ry: 1.8, rot: 50,  fill: "#A08060" },
  { cx: 98,  cy: 62,  rx: 4.5, ry: 2.8, rot: 165, fill: "#6B5A45" },
  { cx: 118, cy: 70,  rx: 3.0, ry: 2.0, rot: 75,  fill: "#5A4A38" },
  { cx: 142, cy: 60,  rx: 2.5, ry: 1.5, rot: 130, fill: "#8B7355" },
  { cx: 162, cy: 67,  rx: 4.0, ry: 2.5, rot: 20,  fill: "#A08060" },
  { cx: 182, cy: 62,  rx: 3.5, ry: 2.0, rot: 95,  fill: "#6B5A45" },
  // Row 4
  { cx: 5,   cy: 85,  rx: 3.5, ry: 2.0, rot: 45,  fill: "#5A4A38" },
  { cx: 28,  cy: 92,  rx: 4.0, ry: 2.5, rot: 125, fill: "#8B7355" },
  { cx: 50,  cy: 82,  rx: 2.5, ry: 1.5, rot: 70,  fill: "#A08060" },
  { cx: 72,  cy: 90,  rx: 3.5, ry: 2.2, rot: 175, fill: "#6B5A45" },
  { cx: 92,  cy: 84,  rx: 3.0, ry: 1.8, rot: 35,  fill: "#5A4A38" },
  { cx: 112, cy: 93,  rx: 4.5, ry: 2.8, rot: 110, fill: "#8B7355" },
  { cx: 132, cy: 85,  rx: 3.0, ry: 2.0, rot: 55,  fill: "#A08060" },
  { cx: 152, cy: 91,  rx: 2.5, ry: 1.5, rot: 145, fill: "#6B5A45" },
  { cx: 174, cy: 88,  rx: 4.0, ry: 2.3, rot: 80,  fill: "#5A4A38" },
  { cx: 196, cy: 83,  rx: 3.5, ry: 2.0, rot: 160, fill: "#8B7355" },
  // Row 5
  { cx: 18,  cy: 112, rx: 3.0, ry: 1.8, rot: 25,  fill: "#6B5A45" },
  { cx: 40,  cy: 118, rx: 4.5, ry: 2.8, rot: 95,  fill: "#A08060" },
  { cx: 62,  cy: 108, rx: 3.5, ry: 2.2, rot: 155, fill: "#5A4A38" },
  { cx: 82,  cy: 115, rx: 2.5, ry: 1.5, rot: 40,  fill: "#8B7355" },
  { cx: 104, cy: 110, rx: 4.0, ry: 2.5, rot: 120, fill: "#6B5A45" },
  { cx: 124, cy: 118, rx: 3.0, ry: 1.8, rot: 65,  fill: "#A08060" },
  { cx: 145, cy: 108, rx: 3.5, ry: 2.0, rot: 175, fill: "#5A4A38" },
  { cx: 165, cy: 115, rx: 4.0, ry: 2.5, rot: 30,  fill: "#8B7355" },
  { cx: 185, cy: 112, rx: 2.5, ry: 1.5, rot: 100, fill: "#6B5A45" },
  // Row 6
  { cx: 10,  cy: 138, rx: 4.0, ry: 2.5, rot: 75,  fill: "#A08060" },
  { cx: 32,  cy: 142, rx: 2.5, ry: 1.5, rot: 150, fill: "#5A4A38" },
  { cx: 55,  cy: 135, rx: 3.5, ry: 2.2, rot: 45,  fill: "#8B7355" },
  { cx: 78,  cy: 140, rx: 3.0, ry: 1.8, rot: 110, fill: "#6B5A45" },
  { cx: 100, cy: 136, rx: 4.5, ry: 2.8, rot: 20,  fill: "#A08060" },
  { cx: 122, cy: 143, rx: 3.0, ry: 2.0, rot: 165, fill: "#5A4A38" },
  { cx: 142, cy: 133, rx: 2.5, ry: 1.5, rot: 85,  fill: "#8B7355" },
  { cx: 162, cy: 140, rx: 4.0, ry: 2.3, rot: 130, fill: "#6B5A45" },
  { cx: 183, cy: 137, rx: 3.5, ry: 2.0, rot: 55,  fill: "#A08060" },
  // Row 7
  { cx: 20,  cy: 162, rx: 3.0, ry: 1.8, rot: 140, fill: "#8B7355" },
  { cx: 44,  cy: 168, rx: 4.5, ry: 2.8, rot: 60,  fill: "#5A4A38" },
  { cx: 65,  cy: 158, rx: 3.5, ry: 2.2, rot: 175, fill: "#6B5A45" },
  { cx: 86,  cy: 165, rx: 2.5, ry: 1.5, rot: 30,  fill: "#A08060" },
  { cx: 108, cy: 160, rx: 4.0, ry: 2.5, rot: 100, fill: "#8B7355" },
  { cx: 128, cy: 168, rx: 3.0, ry: 1.8, rot: 145, fill: "#5A4A38" },
  { cx: 150, cy: 158, rx: 4.0, ry: 2.5, rot: 70,  fill: "#6B5A45" },
  { cx: 170, cy: 165, rx: 3.5, ry: 2.0, rot: 115, fill: "#A08060" },
  { cx: 192, cy: 160, rx: 2.5, ry: 1.5, rot: 40,  fill: "#8B7355" },
  // Row 8
  { cx: 8,   cy: 188, rx: 3.5, ry: 2.2, rot: 90,  fill: "#6B5A45" },
  { cx: 30,  cy: 193, rx: 4.0, ry: 2.5, rot: 155, fill: "#5A4A38" },
  { cx: 52,  cy: 182, rx: 2.5, ry: 1.5, rot: 25,  fill: "#8B7355" },
  { cx: 74,  cy: 190, rx: 3.5, ry: 2.0, rot: 120, fill: "#A08060" },
  { cx: 96,  cy: 186, rx: 4.5, ry: 2.8, rot: 50,  fill: "#6B5A45" },
  { cx: 116, cy: 193, rx: 3.0, ry: 1.8, rot: 135, fill: "#5A4A38" },
  { cx: 138, cy: 183, rx: 4.0, ry: 2.5, rot: 75,  fill: "#8B7355" },
  { cx: 158, cy: 190, rx: 3.5, ry: 2.0, rot: 160, fill: "#A08060" },
  { cx: 178, cy: 185, rx: 2.5, ry: 1.5, rot: 35,  fill: "#6B5A45" },
  { cx: 197, cy: 192, rx: 4.0, ry: 2.3, rot: 105, fill: "#5A4A38" },
];

export default function BeforeAfterSlider() {
  const [split, setSplit] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const rafRef = useRef<number | null>(null);

  const getPosition = (clientX: number): number => {
    if (!containerRef.current) return 50;
    const { left, width } = containerRef.current.getBoundingClientRect();
    return Math.min(100, Math.max(0, ((clientX - left) / width) * 100));
  };

  // Clean up any pending RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Divider drag handlers — pointer events on the divider strip
  const onDividerPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    isDragging.current = true;
    // Capture keeps pointermove/pointerup routed here even outside the element
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onDividerPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const x = e.clientX;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => setSplit(getPosition(x)));
  };

  const onDividerPointerUp = () => {
    isDragging.current = false;
  };

  // Keyboard control on the handle for accessibility
  const onHandleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSplit((s) => Math.max(0, s - 2));
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setSplit((s) => Math.min(100, s + 2));
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden -mt-20 w-full select-none"
      style={{ height: "100svh" }}
      aria-label="Before and after road sweeping comparison"
    >
      {/* ── AFTER panel — clean swept road, sits underneath ─────────────────── */}
      <div className="absolute inset-0">
        {/* Base asphalt colour */}
        <div className="absolute inset-0" style={{ background: "#3A3A3A" }} />

        {/* Subtle sheen: faint light wash at top fading to slight depth at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 35%, rgba(0,0,0,0.08) 100%)",
          }}
        />

        {/* Road markings: crisp white dashes + faint edge line suggestions */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ display: "block" }}
          aria-hidden="true"
        >
          <defs>
            {/* Centre line dash: 60px dash, 40px gap = 100px period */}
            <pattern
              id="afterCentreDash"
              x="0"
              y="0"
              width="8"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="8" height="60" fill="#FFFFFF" fillOpacity="0.9" />
            </pattern>
          </defs>

          {/* Centre dashes — x="50%" with translate(-4) to centre the 8px rect */}
          <rect
            x="50%"
            y="0"
            width="8"
            height="100%"
            fill="url(#afterCentreDash)"
            transform="translate(-4 0)"
          />

          {/* Faint kerbline suggestions near each edge */}
          <rect x="7%" y="0" width="1" height="100%" fill="#FFFFFF" fillOpacity="0.10" />
          <rect x="93%" y="0" width="1" height="100%" fill="#FFFFFF" fillOpacity="0.10" />
        </svg>
      </div>

      {/* ── BEFORE panel — chip-scattered road, clipped to the left ─────────── */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
      >
        {/* Base dark asphalt */}
        <div className="absolute inset-0" style={{ background: "#2A2520" }} />

        {/* Faded centre line dashes — rendered BELOW chips so chips obscure them */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ display: "block" }}
          aria-hidden="true"
        >
          <defs>
            {/* Slightly shorter dash (58px) and phase-shifted (y=8) for a
                worn, irregular feel; width 9px and offset -6 nudges it off-true */}
            <pattern
              id="beforeCentreDash"
              x="0"
              y="8"
              width="9"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="9" height="58" fill="#E8E0CC" fillOpacity="0.25" />
            </pattern>
          </defs>

          <rect
            x="50%"
            y="0"
            width="9"
            height="100%"
            fill="url(#beforeCentreDash)"
            transform="translate(-6 0)"
          />
        </svg>

        {/* Chip seal aggregate scatter — tiling 200x200 SVG pattern */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ display: "block" }}
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="chipSealPattern"
              x="0"
              y="0"
              width="200"
              height="200"
              patternUnits="userSpaceOnUse"
            >
              {chips.map((chip, i) => (
                <ellipse
                  key={i}
                  cx={chip.cx}
                  cy={chip.cy}
                  rx={chip.rx}
                  ry={chip.ry}
                  fill={chip.fill}
                  transform={`rotate(${chip.rot} ${chip.cx} ${chip.cy})`}
                />
              ))}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#chipSealPattern)" />
        </svg>

        {/* Dusty warm brown overlay — adds the dirty, unsewpt atmosphere */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(120,85,50,0.07)" }}
        />
      </div>

      {/* ── Corner labels ────────────────────────────────────────────────────── */}
      <p
        className="absolute top-24 left-6 md:left-8 z-20 pointer-events-none text-xs font-semibold uppercase"
        style={{ color: "var(--off-white)", letterSpacing: "0.15em", opacity: 0.85 }}
      >
        Before
      </p>
      <p
        className="absolute top-24 right-6 md:right-8 z-20 pointer-events-none text-xs font-semibold uppercase"
        style={{ color: "var(--off-white)", letterSpacing: "0.15em", opacity: 0.85 }}
      >
        After
      </p>

      {/* ── Divider strip — 44px wide hit target centred on the line ─────────── */}
      <div
        className="absolute inset-y-0 z-10"
        style={{
          left: `${split}%`,
          width: 44,
          transform: "translateX(-50%)",
          cursor: "ew-resize",
        }}
        onPointerDown={onDividerPointerDown}
        onPointerMove={onDividerPointerMove}
        onPointerUp={onDividerPointerUp}
        onPointerCancel={onDividerPointerUp}
      >
        {/* Visible line */}
        <div
          className="absolute inset-y-0 left-1/2"
          style={{ width: 2, transform: "translateX(-50%)", background: "var(--red)" }}
        />

        {/* Handle — outer div positions, inner div handles hover/active transforms */}
        <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%)" }}>
          <div
            tabIndex={0}
            role="slider"
            aria-label="Drag to compare before and after sweeping"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(split)}
            onKeyDown={onHandleKeyDown}
            className="flex items-center justify-center gap-0.5 hover:scale-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white"
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "var(--red)",
              cursor: "ew-resize",
              transition: "transform 0.15s ease",
              boxShadow:
                "0 2px 8px rgba(30,30,32,0.22), 0 4px 24px rgba(30,30,32,0.18)",
            }}
          >
            <ChevronLeft size={14} strokeWidth={2.5} color="#fff" aria-hidden="true" />
            <ChevronRight size={14} strokeWidth={2.5} color="#fff" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* ── Bottom gradient for text legibility ─────────────────────────────── */}
      <div
        className="absolute inset-x-0 bottom-0 z-20 pointer-events-none"
        style={{
          height: "65%",
          background:
            "linear-gradient(to top, rgba(30,30,32,0.90) 0%, rgba(30,30,32,0.45) 45%, transparent 100%)",
        }}
      />

      {/* ── Headline and CTA, anchored bottom-left ───────────────────────────── */}
      <div className="absolute bottom-10 md:bottom-14 left-6 md:left-8 max-w-lg z-30">
        <p
          className="text-xs font-semibold uppercase mb-3"
          style={{ color: "var(--off-white)", letterSpacing: "0.15em", opacity: 0.85 }}
        >
          Christchurch's Road Sweeping Specialists
        </p>
        <h1
          className="mb-6"
          style={{
            fontFamily: "var(--font-archivo-black), sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "var(--off-white)",
          }}
        >
          We Clean What Others Leave Behind
        </h1>
        <Link
          href="/contact"
          className="btn-red active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
        >
          Get a Quote
        </Link>
      </div>
    </section>
  );
}
