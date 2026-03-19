import type { CSSProperties } from "react";
import Link from "next/link";
import { Zap, ShieldCheck, MapPin, Truck, ArrowRight } from "lucide-react";
import BeforeAfterSlider from "@/app/components/hero/BeforeAfterSlider";
import { services } from "@/data/services";

const features = [
  {
    icon: Zap,
    title: "Fast Response",
    description:
      "We schedule quickly and show up on time, because delays after a chip seal cost everyone.",
  },
  {
    icon: ShieldCheck,
    title: "NZTA Compliant",
    description:
      "All sweeping operations meet NZTA and Waka Kotahi standards, with traffic management handled.",
  },
  {
    icon: MapPin,
    title: "Christchurch Based",
    description:
      "Local team, local knowledge. We know the roads, the contractors, and the compliance requirements.",
  },
  {
    icon: Truck,
    title: "Fully Equipped",
    description:
      "Modern, purpose-built sweeping equipment for every job size, from a single seal to a full network contract.",
  },
];

const marqueeText =
  "Chip Seal Sweeping \u00b7 Road Sweeping \u00b7 Construction Cleanup \u00b7 Kerbline Cleaning \u00b7 Christchurch \u00b7 Reliable \u00b7 Efficient \u00b7 Trusted \u00b7\u2002\u2002";

const delayClass = ["d1", "d2", "d3", "d4"] as const;

export default function HomePage() {
  return (
    <>
      {/* Section 1 — Hero */}
      <BeforeAfterSlider />

      {/* Section 2 — Marquee strip */}
      <div
        className="overflow-hidden py-4 md:py-5"
        style={{ background: "var(--red)" }}
      >
        <div
          className="flex w-max"
          style={{ animation: "marquee-scroll 24s linear infinite" }}
          aria-hidden="true"
        >
          <span
            className="text-white font-semibold text-sm tracking-wide"
            style={{ whiteSpace: "nowrap", paddingRight: "0" }}
          >
            {marqueeText}
          </span>
          <span
            className="text-white font-semibold text-sm tracking-wide"
            style={{ whiteSpace: "nowrap" }}
          >
            {marqueeText}
          </span>
        </div>
      </div>

      {/* Section 3 — Services Overview */}
      <section className="py-20 md:py-28" style={{ background: "var(--off-white)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="mb-12 md:mb-16">
            <p className="eyebrow mb-3">WHAT WE DO</p>
            <h2 className="section-title mb-4">
              Professional Road Sweeping Services
            </h2>
            <p
              className="text-base md:text-lg"
              style={{ color: "var(--charcoal)", lineHeight: 1.7, maxWidth: "42ch" }}
            >
              Keeping Christchurch roads clean, safe, and compliant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <div
                key={service.slug}
                className={`service-card reveal ${delayClass[i]} p-8 rounded`}
              >
                <div
                  className="mb-4 leading-none"
                  style={{
                    fontFamily: "var(--font-archivo-black), sans-serif",
                    fontSize: "2.5rem",
                    color: "var(--red)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: "var(--font-archivo-black), sans-serif",
                    fontSize: "1.25rem",
                    color: "var(--charcoal)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm mb-6"
                  style={{ color: "var(--charcoal)", lineHeight: 1.75, opacity: 0.72 }}
                >
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold hover:text-red-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red rounded active:opacity-70"
                  style={{ color: "var(--red)" }}
                >
                  Learn more
                  <ArrowRight size={14} strokeWidth={2.5} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Why Sweepco */}
      <section className="py-20 md:py-28" style={{ background: "var(--stone)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="mb-12 md:mb-16">
            <p className="eyebrow mb-3">WHY SWEEPCO</p>
            <h2 className="section-title mb-4">Built for the Job</h2>
            <p
              className="text-base md:text-lg"
              style={{ color: "var(--charcoal)", lineHeight: 1.7, maxWidth: "46ch" }}
            >
              Everything you need from a road sweeping contractor, nothing you don't.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`feature-card reveal ${delayClass[i]} p-8 rounded`}
                >
                  <div className="mb-5">
                    <Icon
                      size={32}
                      strokeWidth={1.75}
                      style={{ color: "var(--red)" }}
                    />
                  </div>
                  <h3
                    className="mb-3"
                    style={{
                      fontFamily: "var(--font-archivo-black), sans-serif",
                      fontSize: "1.25rem",
                      color: "var(--charcoal)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "var(--charcoal)", lineHeight: 1.75, opacity: 0.72 }}
                  >
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 5 — CTA Band */}
      <section className="py-20 md:py-28" style={{ background: "var(--red)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
          <h2
            style={{
              fontFamily: "var(--font-archivo-black), sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "-0.03em",
              color: "#fff",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            Ready to Book a Sweep?
          </h2>
          <p
            className="text-base md:text-lg mb-10"
            style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}
          >
            Get in touch with our Christchurch team today.
          </p>
          <Link
            href="/contact"
            className="btn-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
            style={{ "--tw-ring-offset-color": "var(--red)" } as CSSProperties}
          >
            Get a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
