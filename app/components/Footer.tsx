import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { brand } from "@/config/brand";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--charcoal)", color: "#fff" }}>
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Wordmark + tagline + description */}
          <div className="flex flex-col gap-4">
            <span
              className="font-display text-xl"
              style={{
                color: "var(--red)",
                fontFamily: "var(--font-archivo-black), sans-serif",
                letterSpacing: "-0.03em",
              }}
            >
              SWEEPCO
            </span>
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--stone)", letterSpacing: "0.04em" }}
            >
              {brand.tagline}
            </p>
            <p className="text-sm leading-relaxed text-white/55">
              Professional road sweeping services across Christchurch.
            </p>
          </div>

          {/* Column 2: Quick links */}
          <div className="flex flex-col gap-3">
            <p
              className="text-xs font-semibold uppercase"
              style={{ letterSpacing: "0.12em", color: "var(--stone)" }}
            >
              Quick Links
            </p>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm w-fit text-white/70 hover:text-red transition-colors duration-200 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone active:opacity-60"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact details */}
          <div className="flex flex-col gap-3">
            <p
              className="text-xs font-semibold uppercase"
              style={{ letterSpacing: "0.12em", color: "var(--stone)" }}
            >
              Contact
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${brand.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-sm w-fit text-white/70 hover:text-red transition-colors duration-200 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone active:opacity-60"
              >
                <Phone size={14} strokeWidth={2} style={{ color: "var(--red)", flexShrink: 0 }} />
                {brand.phone}
              </a>

              <a
                href={`mailto:${brand.email}`}
                className="flex items-center gap-3 text-sm w-fit text-white/70 hover:text-red transition-colors duration-200 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone active:opacity-60"
              >
                <Mail size={14} strokeWidth={2} style={{ color: "var(--red)", flexShrink: 0 }} />
                {brand.email}
              </a>

              <div className="flex items-center gap-3 text-sm text-white/70">
                <MapPin size={14} strokeWidth={2} style={{ color: "var(--red)", flexShrink: 0 }} />
                {brand.address}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-7xl mx-auto px-6 md:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <p className="text-xs text-white/40">
          &copy; 2026 {brand.name}. Part of {brand.parentGroup}. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/privacy"
            className="text-xs text-white/40 hover:text-red transition-colors duration-200 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone active:opacity-60"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-xs text-white/40 hover:text-red transition-colors duration-200 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone active:opacity-60"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
