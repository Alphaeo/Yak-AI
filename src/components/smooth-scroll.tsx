"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Scroll fluide (Lenis) synchronisé avec les animations GSAP ScrollTrigger.
// Désactivé si l'utilisateur a demandé moins d'animations dans son système.
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: false });
    // À chaque scroll de Lenis, ScrollTrigger recalcule la progression des animations
    lenis.on("scroll", ScrollTrigger.update);
    // Lenis avance au même rythme que GSAP (une seule boucle d'animation)
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  // Changement de page : on repart du haut et on recalcule les déclencheurs
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}
