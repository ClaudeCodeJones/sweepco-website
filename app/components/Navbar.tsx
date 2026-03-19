"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(245, 242, 239, 0.94)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid",
        borderBottomColor: scrolled ? "var(--stone)" : "transparent",
        transition: "border-color 0.3s ease",
      }}
    >
      {/* Main bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-[80px] flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-xl tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red rounded"
          style={{
            color: "var(--red)",
            fontFamily: "var(--font-archivo-black), sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          SWEEPCO
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2 active:opacity-70"
              style={{
                color: pathname === link.href ? "var(--red)" : "var(--charcoal)",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (pathname !== link.href)
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--red)";
              }}
              onMouseLeave={(e) => {
                if (pathname !== link.href)
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--charcoal)";
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="btn-red active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red active:scale-95"
          style={{ color: "var(--charcoal)", transition: "color 0.2s ease" }}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        id="mobile-menu"
        className="md:hidden"
        aria-hidden={!menuOpen}
        style={{
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(-6px)",
          pointerEvents: menuOpen ? "auto" : "none",
          borderBottom: "1px solid",
          borderBottomColor: menuOpen ? "var(--stone)" : "transparent",
          transition: "opacity 0.2s ease, transform 0.2s ease, border-color 0.2s ease",
        }}
      >
        <nav
          className="max-w-7xl mx-auto px-6 pb-4 flex flex-col"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red active:opacity-70"
              style={{
                color: pathname === link.href ? "var(--red)" : "var(--charcoal)",
                borderBottom: i < navLinks.length - 1 ? "1px solid var(--stone)" : "none",
                transition: "color 0.2s ease",
              }}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4">
            <Link
              href="/contact"
              className="btn-red w-full active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red"
            >
              Get a Quote
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
