"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { Truck } from "lucide-react";

export default function BeforeAfterSlider() {
  const [split, setSplit] = useState(20);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const rafRef = useRef<number | null>(null);

  const getPosition = (clientX: number): number => {
    if (!containerRef.current) return 20;
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
      className="relative overflow-hidden -mt-14 md:-mt-20 w-full select-none"
      style={{ height: "100svh", backgroundColor: "#1e1e20" }}
      aria-label="Before and after road sweeping comparison"
    >
      {/* After panel — clean swept road, sits underneath */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero-after.webp"
          alt="Clean swept road after chip seal sweeping"
          fill
          style={{ objectFit: "cover", objectPosition: "center bottom" }}
          priority={true}
        />
      </div>

      {/* Before panel — chip-scattered road, clipped to the left of the divider */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
      >
        <Image
          src="/images/hero-before.webp"
          alt="Road covered in loose chip seal before sweeping"
          fill
          style={{ objectFit: "cover", objectPosition: "center bottom" }}
          priority={true}
        />
      </div>

      {/* Sweepco logo — wipe reveal tied directly to divider position (no CSS transition).
          clipPath inset(0 ${100-split}% 0 0) progressively uncovers the logo left-to-right
          as the divider sweeps right, and clips it back when dragging left.
          z-index 5: above image panels, below divider (10), labels (20), gradient (20), headline (30) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - split}% 0 0)`, zIndex: 5 }}
      >
        <div
          className="absolute w-[200px] md:w-[540px] top-[32%] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          {/* Frosted glass panel behind logo */}
          <div
            className="p-5 md:p-8"
            style={{
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              background: "rgba(20, 20, 22, 0.45)",
              borderRadius: "16px",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              isolation: "isolate",
            }}
          >
            <Image
              src="/logos/sweepco-logo.svg"
              alt="Sweepco logo"
              width={540}
              height={499}
              style={{
                width: "100%",
                height: "auto",
                filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))",
              }}
            />
          </div>
        </div>
      </div>

      {/* Divider strip — 44px wide hit target centred on the line */}
      <div
        className="absolute inset-y-0 z-10"
        style={{
          left: `${split}%`,
          width: 44,
          transform: "translateX(-50%)",
          cursor: "ew-resize",
          touchAction: "none",
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
            <Truck size={20} strokeWidth={1.75} color="#fff" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Bottom gradient for text legibility */}
      <div
        className="absolute inset-x-0 bottom-0 z-20 pointer-events-none"
        style={{
          height: "65%",
          background:
            "linear-gradient(to top, rgba(30,30,32,0.90) 0%, rgba(30,30,32,0.45) 45%, transparent 100%)",
        }}
      />

      {/* Headline and CTA, anchored bottom-left */}
      <div className="absolute bottom-10 md:bottom-14 left-6 md:left-8 max-w-lg z-30">
        <p
          className="text-xs font-semibold uppercase mb-3"
          style={{ color: "var(--off-white)", letterSpacing: "0.15em", opacity: 0.85 }}
        >
          Canterbury's Road Sweeping Specialists
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
