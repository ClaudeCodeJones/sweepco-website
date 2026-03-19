export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  href: string;
};

export const services: Service[] = [
  {
    slug: "chip-seal-sweeping",
    title: "Chip Seal Sweeping",
    shortTitle: "Chip Seal",
    description:
      "Post-seal aggregate removal after chip seal applications. Fast, compliant, and scheduled around your project timeline.",
    href: "/services/chip-seal-sweeping",
  },
  {
    slug: "road-sweeping",
    title: "Road Sweeping",
    shortTitle: "Road Sweeping",
    description:
      "General road sweeping for maintenance contracts, councils, and infrastructure projects across Christchurch.",
    href: "/services/road-sweeping",
  },
  {
    slug: "construction-cleanup",
    title: "Construction Cleanup",
    shortTitle: "Construction Cleanup",
    description:
      "Site sweeping and debris removal for civil construction projects, keeping sites clean for handover and compliance.",
    href: "/services/construction-cleanup",
  },
  {
    slug: "kerbline-cleaning",
    title: "Kerbline Cleaning",
    shortTitle: "Kerbline Cleaning",
    description:
      "Detailed kerbline, footpath, and gutter sweeping ensuring adjacent infrastructure is clean and clear.",
    href: "/services/kerbline-cleaning",
  },
];
