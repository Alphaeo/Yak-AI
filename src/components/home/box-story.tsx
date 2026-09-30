"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/button";
import type { BoxAnim } from "./box-scene";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// La 3D n'est chargée que dans le navigateur (Three.js n'a pas de sens côté serveur)
const BoxScene = dynamic(() => import("./box-scene"), { ssr: false });

const steps = [
  { verb: "Lire", tool: "Lecture d'ordonnance", text: "L'ordonnance devient des lignes prêtes à saisir." },
  { verb: "Vérifier", tool: "Contrôle des interactions", text: "Chaque ligne est croisée avec le dossier patient." },
  { verb: "Conseiller", tool: "Assistant de conseil", text: "Une réponse sourcée pour le patient au comptoir." },
];

// Récit au scroll : une section haute (500vh) dont le contenu reste collé à l'écran.
// GSAP fait avancer une timeline selon le scroll ; la timeline anime `anim`, que la scène 3D lit.
export function BoxStory() {
  const root = useRef<HTMLElement>(null);
  const anim = useRef<BoxAnim>({ camZ: 6, posX: 1.4, posY: 0, rotX: 0.25, rotY: -0.6, float: 1 });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { desktop: "(min-width: 768px)", motion: "(prefers-reduced-motion: no-preference)" },
        (context) => {
          const { desktop, motion } = context.conditions!;
          // Sur mobile, le texte est en haut : la boîte reste centrée, plus bas et plus loin
          const side = desktop ? 1.4 : 0;
          const low = desktop ? 0 : -1.3;
          const far = desktop ? 6 : 9;
          Object.assign(anim.current, { camZ: far, posX: side, posY: low, rotX: 0.25, rotY: -0.6, float: 1 });
          if (!motion) return;

          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut", duration: 1 },
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 1 },
          });

          // 1. Zoom sur la croix de la boîte
          tl.to(".story-hero", { autoAlpha: 0, y: -24, duration: 0.4 }, 0)
            .to(anim.current, { camZ: 2.3, posX: 0, posY: 0, rotX: 0, rotY: 0, float: 0 }, 0)
            .to(".story-tint", { opacity: 1 }, 0)
            .fromTo(".story-zoom", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.6);

          // 2. Recul, puis la boîte tourne : une étape du parcours par face
          tl.to(".story-zoom", { autoAlpha: 0, duration: 0.3 }, 1.4)
            .to(anim.current, { camZ: far - 1.5, posX: side * 0.75, posY: low * 0.6 }, 1.4)
            .fromTo(".story-step-0", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 1.8)
            .to(anim.current, { rotY: -Math.PI / 2 }, 2.3)
            .fromTo(".story-step-1", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 2.6)
            .to(anim.current, { rotX: 0.9 }, 3.2)
            .fromTo(".story-step-2", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 3.5);

          // 3. La boîte passe de l'autre côté, place à la suite du site
          tl.to(".story-steps", { autoAlpha: 0, duration: 0.3 }, 4.2)
            .to(anim.current, { camZ: far, posX: -side, rotX: 0.25, rotY: -0.6 + Math.PI * 2, float: 1 }, 4.2)
            .to(".story-tint", { opacity: 0 }, 4.2)
            .fromTo(".story-end", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 4.8);
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[500vh] motion-reduce:h-[calc(100svh-4rem)]">
      <div className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden">
        <div className="story-tint absolute inset-0 bg-accent-soft opacity-0" />
        <div className="absolute inset-0">
          <BoxScene anim={anim} />
        </div>

        <div className="pointer-events-none relative mx-auto h-full max-w-[1200px] px-5 md:px-8">
          {/* Étape 0 : accroche */}
          <div className="story-hero pointer-events-auto flex h-full max-w-xl flex-col justify-start gap-6 pt-10 md:justify-center md:pt-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Outils d&apos;IA pour l&apos;officine
            </p>
            <h1 className="font-display text-[2.75rem] leading-none font-semibold tracking-tight md:text-h1">
              Moins de saisie.
              <br />
              Plus de comptoir.
            </h1>
            <p className="max-w-md text-base text-muted md:text-xl">
              Yak AI réunit huit outils d&apos;IA branchés sur votre logiciel d&apos;officine : lecture
              d&apos;ordonnance, interactions, commandes, tiers payant.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/outils">
                Voir les 8 outils <ArrowRight size={18} />
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Demander une démo
              </ButtonLink>
            </div>
          </div>

          {/* Étape 1 : zoom */}
          <div className="story-zoom invisible absolute inset-x-5 bottom-10 opacity-0 md:inset-x-8">
            <p className="max-w-2xl font-display text-h3 font-semibold tracking-tight md:text-h2">
              Une ordonnance, un patient, quelques minutes au comptoir.
            </p>
          </div>

          {/* Étape 2 : le parcours de dispensation */}
          <ol className="story-steps absolute inset-x-5 top-8 flex max-w-md flex-col gap-6 md:inset-x-8 md:top-1/2 md:-translate-y-1/2">
            {steps.map((step, index) => (
              <li
                key={step.verb}
                className={`story-step-${index} invisible flex gap-4 opacity-0`}
              >
                <span className="font-mono text-sm text-accent">0{index + 1}</span>
                <div className="flex flex-col gap-1">
                  <span className="font-display text-h3 font-semibold tracking-tight">{step.verb}</span>
                  <span className="text-sm font-semibold">{step.tool}</span>
                  <span className="text-sm text-muted">{step.text}</span>
                </div>
              </li>
            ))}
          </ol>

          {/* Étape 3 : transition vers la suite */}
          <div className="story-end pointer-events-auto invisible absolute inset-x-5 top-8 flex flex-col gap-4 opacity-0 md:inset-x-auto md:top-1/2 md:right-8 md:max-w-md md:-translate-y-1/2">
            <p className="font-display text-h3 font-semibold tracking-tight">
              Et derrière le comptoir : stock, ruptures, tiers payant.
            </p>
            <p className="text-muted">Cinq autres outils prennent en charge le travail de fond.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
