import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { PricingPlans } from "@/components/pricing/pricing-plans";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Tarifs",
  description: "Les formules Yak AI pour les pharmacies et les groupements.",
};

const faq = [
  {
    q: "Faut-il changer de logiciel d'officine ?",
    a: "Non. Yak AI se branche sur votre LGO actuel. L'installation se fait à distance, en une demi-journée.",
  },
  {
    q: "Puis-je changer de formule en cours d'année ?",
    a: "Oui, à tout moment. Le changement s'applique à la facture du mois suivant.",
  },
  {
    q: "Que se passe-t-il après les 30 jours d'essai ?",
    a: "Vous choisissez une formule, ou vous arrêtez. Sans engagement, rien n'est facturé pendant l'essai.",
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-16 px-5 pt-16 pb-24 md:px-8">
      <PageIntro
        eyebrow="Tarifs"
        title="Un prix par officine, sans engagement"
        text="Tous les prix sont hors taxes, par officine. Essai gratuit de 30 jours sur toutes les formules."
      />
      <PricingPlans />
      <section className="grid gap-10 border-t border-line pt-16 md:grid-cols-[1fr_2fr]">
        <h2 className="font-display text-h3 font-semibold tracking-tight">Questions fréquentes</h2>
        <Reveal className="flex flex-col">
          {faq.map((item) => (
            <div key={item.q} className="flex flex-col gap-2 border-b border-line py-5 first:pt-0">
              <h3 className="font-semibold">{item.q}</h3>
              <p className="max-w-[65ch] text-muted">{item.a}</p>
            </div>
          ))}
        </Reveal>
      </section>
    </div>
  );
}
