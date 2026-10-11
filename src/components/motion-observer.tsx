"use client";

import { useEffect } from "react";

export default function MotionObserver() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-reveal]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;

    const showAll = () => {
      observer?.disconnect();
      elements.forEach((element) => {
        element.dataset.reveal = "visible";
      });
    };

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      showAll();
    } else {
      try {
        observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const element = entry.target as HTMLElement;
            element.dataset.reveal = "visible";
            observer?.unobserve(element);
          });
        }, { threshold: 0.08, rootMargin: "0px 0px -32px 0px" });

        elements.forEach((element) => {
          const bounds = element.getBoundingClientRect();
          const alreadyVisible = bounds.top < window.innerHeight * 0.92 && bounds.bottom > 0;
          if (alreadyVisible) {
            element.dataset.reveal = "visible";
          } else {
            element.dataset.reveal = "pending";
            observer?.observe(element);
          }
        });
      } catch {
        showAll();
      }
    }

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      if (event.matches) showAll();
    };
    reducedMotion.addEventListener("change", handleMotionPreference);

    return () => {
      reducedMotion.removeEventListener("change", handleMotionPreference);
      observer?.disconnect();
      elements.forEach((element) => delete element.dataset.reveal);
    };
  }, []);

  return null;
}
