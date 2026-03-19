"use client";

import { useEffect } from "react";

export default function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 }
    );

    const targets = document.querySelectorAll<HTMLElement>(".reveal");
    for (const el of targets) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
