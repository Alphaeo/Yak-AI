"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { ButtonLink } from "@/components/button";

type Plan = {
  name: string;
  monthly: number | null; // null = sur devis
  audience: string;
  features: string[];
  highlighted?: boolean;
};

const plans: Plan[] = [
  {
    name: "Essentiel",
    monthly: 89,
    audience: "Pour démarrer avec les outils du comptoir.",
    features: ["Lecture d'ordonnance", "Contrôle des interactions", "Fiches de bon usage", "Support par e-mail"],
  },
  {
    name: "Officine",
    monthly: 189,
    audience: "Les huit outils, du comptoir au stock.",
    features: [
      "Tout Essentiel",
      "Prévision de commandes et veille ruptures",
      "Assistant de conseil et bilan de médication",
      "Rejets de tiers payant",
      "Support téléphonique",
    ],
    highlighted: true,
  },
  {
    name: "Groupement",
    monthly: null,
    audience: "Pour les réseaux de 5 officines et plus.",
    features: ["Tout Officine", "Tableau de bord multi-officines", "Interlocuteur dédié"],
  },
];

const ANNUAL_DISCOUNT = 0.15;

export function PricingPlans() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label="Période de facturation" className="flex gap-1 self-start rounded-md border border-line bg-surface p-1">
        {[
          { value: false, label: "Mensuel" },
          { value: true, label: "Annuel · −15 %" },
        ].map((option) => (
          <button
            key={option.label}
            type="button"
            aria-pressed={annual === option.value}
            onClick={() => setAnnual(option.value)}
            className={`h-8 rounded-sm px-3 text-sm transition-colors duration-150 ${
              annual === option.value ? "bg-ink text-surface" : "text-muted hover:text-ink"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => {
          const price = plan.monthly === null ? null : Math.round(plan.monthly * (annual ? 1 - ANNUAL_DISCOUNT : 1));
          return (
            <div
              key={plan.name}
              className={`flex flex-col gap-6 rounded-lg border bg-surface p-6 ${
                plan.highlighted ? "border-accent" : "border-line"
              }`}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-xl font-semibold">{plan.name}</h2>
                  {plan.highlighted && <span className="text-xs font-semibold text-accent">Le plus choisi</span>}
                </div>
                <p className="text-sm text-muted">{plan.audience}</p>
              </div>
              <p className="flex items-baseline gap-1">
                {price === null ? (
                  <span className="font-display text-h3 font-semibold">Sur devis</span>
                ) : (
                  <>
                    <span className="font-display text-h2 font-semibold tabular-nums">{price} €</span>
                    <span className="text-sm text-muted">HT / mois</span>
                  </>
                )}
              </p>
              <ul className="flex flex-1 flex-col gap-3 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href="/contact"
                variant={plan.highlighted ? "primary" : "secondary"}
              >
                {plan.monthly === null ? "Demander un devis" : "Commencer l'essai"}
              </ButtonLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}
