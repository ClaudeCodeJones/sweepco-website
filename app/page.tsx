import Image from "next/image";

export default function HomePage() {
  return (
    <section
      className="relative flex items-center justify-center w-full -mt-14 md:-mt-20"
      style={{
        minHeight: "100svh",
        background: [
          "radial-gradient(ellipse at 50% -5%, rgba(204,35,36,0.18) 0%, transparent 55%)",
          "radial-gradient(ellipse at 10% 85%, rgba(204,35,36,0.07) 0%, transparent 45%)",
          "radial-gradient(ellipse at 90% 75%, rgba(204,35,36,0.05) 0%, transparent 40%)",
          "var(--charcoal)",
        ].join(", "),
      }}
    >
      <div className="flex flex-col items-center text-center px-6 max-w-sm md:max-w-md">
        <Image
          src="/logos/sweepco_logo_colour.png"
          alt="SweepCo logo"
          width={220}
          height={220}
          style={{ height: "auto", width: "clamp(140px, 30vw, 200px)" }}
          className="mb-12"
          priority
        />

        {/* Thin brand rule for hierarchy */}
        <div
          className="mb-8 rounded-full"
          style={{ width: 36, height: 2, background: "var(--red)", opacity: 0.7 }}
          aria-hidden="true"
        />

        <h1
          className="font-display mb-5"
          style={{
            fontSize: "clamp(1.875rem, 5.5vw, 3rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "#fff",
          }}
        >
          SweepCo is coming soon
        </h1>

        <p
          style={{
            color: "rgba(245,242,239,0.55)",
            lineHeight: 1.75,
            fontSize: "1rem",
            maxWidth: "32ch",
            letterSpacing: "0.01em",
          }}
        >
          Professional sweeping services. Built for reliability and performance.
        </p>
      </div>
    </section>
  );
}
