import Image from "next/image";

export default function HomePage() {
  return (
    <section
      className="relative flex items-center justify-center w-full -mt-14 md:-mt-20"
      style={{
        minHeight: "100svh",
        background:
          "radial-gradient(ellipse at 30% 40%, rgba(204,35,36,0.07) 0%, transparent 55%), radial-gradient(ellipse at 75% 70%, rgba(204,35,36,0.04) 0%, transparent 50%), var(--charcoal)",
      }}
    >
      <div className="flex flex-col items-center text-center px-6 max-w-md">
        <Image
          src="/logos/sweepco_logo_colour.png"
          alt="Sweepco logo"
          width={220}
          height={220}
          style={{ height: "auto" }}
          className="mb-10"
          priority
        />

        <h1
          className="font-display mb-5"
          style={{
            fontSize: "clamp(2rem, 6vw, 3.25rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "#fff",
          }}
        >
          Sweepco is coming soon
        </h1>

        <p
          className="mb-10"
          style={{
            color: "rgba(245,242,239,0.6)",
            lineHeight: 1.7,
            fontSize: "1.0625rem",
            maxWidth: "34ch",
          }}
        >
          Professional sweeping services. Built for reliability and performance.
        </p>

      </div>
    </section>
  );
}
