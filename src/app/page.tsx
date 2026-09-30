import { ButtonLink } from "@/components/button";
import { BoxStory } from "@/components/home/box-story";
import { Reveal } from "@/components/reveal";
import { ToolList } from "@/components/tools/tool-list";
import { tools } from "@/lib/tools";

const integration = [
  {
    title: "Branché sur votre LGO",
    text: "Yak AI lit et écrit dans votre logiciel d'officine. Pas de double saisie, pas de nouvel écran à apprendre au comptoir.",
  },
  {
    title: "L'IA propose, vous validez",
    text: "Chaque suggestion affiche sa source et son niveau de confiance. Rien n'est envoyé ni saisi sans votre accord.",
  },
  {
    title: "Données hébergées en France",
    text: "Les données patient restent chez un hébergeur de données de santé, et ne servent pas à entraîner les modèles.",
  },
];

export default function Home() {
  return (
    <>
      <BoxStory />

      <section className="mx-auto flex max-w-[1200px] flex-col gap-10 px-5 py-24 md:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="flex max-w-2xl flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">Les outils</p>
            <h2 className="font-display text-h3 font-semibold tracking-tight md:text-h2">
              Huit outils, du comptoir à l&apos;arrière-boutique
            </h2>
          </div>
          <ButtonLink href="/outils" variant="secondary">
            Comparer les outils
          </ButtonLink>
        </div>
        <ToolList tools={tools} />
      </section>

      <section className="border-y border-line bg-surface">
        <Reveal className="mx-auto grid max-w-[1200px] gap-10 px-5 py-20 md:grid-cols-3 md:px-8">
          {integration.map((item, index) => (
            <div key={item.title} className="flex flex-col gap-3">
              <span className="font-mono text-sm text-accent">0{index + 1}</span>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-muted">{item.text}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="mx-auto flex max-w-[1200px] flex-col items-start gap-6 px-5 py-24 md:px-8">
        <h2 className="max-w-3xl font-display text-h3 font-semibold tracking-tight md:text-h2">
          Essayez Yak AI sur vos propres ordonnances pendant 30 jours.
        </h2>
        <p className="max-w-xl text-muted">
          Installation à distance en une demi-journée, sans changer de logiciel d&apos;officine.
        </p>
        <ButtonLink href="/contact">Demander une démo</ButtonLink>
      </section>
    </>
  );
}
