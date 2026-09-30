"use client";

import { useState } from "react";

// Démo interactive du contrôle des interactions.
// Jeu de données volontairement réduit : ce n'est pas une base de référence.
const drugs = [
  "Warfarine",
  "Ibuprofène",
  "Paracétamol",
  "Simvastatine",
  "Clarithromycine",
  "Ramipril",
  "Chlorure de potassium",
  "Ciprofloxacine",
  "Sulfate ferreux",
  "Lévothyroxine",
  "Carbonate de calcium",
];

type Level = "Contre-indication" | "Association déconseillée" | "Précaution d'emploi";

const interactions: { pair: [string, string]; level: Level; text: string }[] = [
  {
    pair: ["Warfarine", "Ibuprofène"],
    level: "Association déconseillée",
    text: "Majoration du risque hémorragique de l'anticoagulant (agression de la muqueuse gastroduodénale par l'AINS).",
  },
  {
    pair: ["Warfarine", "Paracétamol"],
    level: "Précaution d'emploi",
    text: "Risque d'augmentation de l'effet anticoagulant aux doses maximales de paracétamol (4 g/j) pendant au moins 4 jours. Contrôler l'INR.",
  },
  {
    pair: ["Simvastatine", "Clarithromycine"],
    level: "Contre-indication",
    text: "Risque majoré de rhabdomyolyse, par diminution du métabolisme de la simvastatine.",
  },
  {
    pair: ["Ramipril", "Chlorure de potassium"],
    level: "Association déconseillée",
    text: "Hyperkaliémie potentiellement létale, surtout en cas d'insuffisance rénale (sauf hypokaliémie).",
  },
  {
    pair: ["Ciprofloxacine", "Sulfate ferreux"],
    level: "Précaution d'emploi",
    text: "Diminution de l'absorption de la ciprofloxacine. Prendre le fer à distance (plus de 2 heures).",
  },
  {
    pair: ["Lévothyroxine", "Carbonate de calcium"],
    level: "Précaution d'emploi",
    text: "Diminution de l'absorption de la lévothyroxine. Prendre le calcium à distance (plus de 2 heures).",
  },
];

const levelStyle: Record<Level, string> = {
  "Contre-indication": "bg-danger-soft text-danger",
  "Association déconseillée": "bg-danger-soft text-danger",
  "Précaution d'emploi": "bg-warn-soft text-warn",
};

function findInteraction(a: string, b: string) {
  return interactions.find(({ pair }) => (pair[0] === a && pair[1] === b) || (pair[0] === b && pair[1] === a));
}

export function InteractionChecker() {
  const [first, setFirst] = useState("Warfarine");
  const [second, setSecond] = useState("Ibuprofène");
  const result = first !== second ? findInteraction(first, second) : undefined;

  return (
    <section aria-labelledby="demo-titre" className="flex flex-col gap-6 rounded-lg border border-line bg-surface p-5 md:p-8">
      <div className="flex flex-col gap-2">
        <h2 id="demo-titre" className="font-display text-h3 font-semibold tracking-tight">
          Essayer le contrôle
        </h2>
        <p className="max-w-[65ch] text-sm text-muted">
          Démo sur 6 associations seulement. Elle ne remplace pas le Thésaurus des interactions de l&apos;ANSM.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <DrugSelect label="Traitement en cours" value={first} onChange={setFirst} />
        <DrugSelect label="Nouvelle ligne d'ordonnance" value={second} onChange={setSecond} />
      </div>

      <div aria-live="polite" className="border-t border-line pt-6">
        {first === second ? (
          <p className="text-muted">Choisissez deux médicaments différents.</p>
        ) : result ? (
          <div className="flex flex-col items-start gap-3">
            <span className={`rounded-sm px-2 py-1 text-xs font-semibold uppercase tracking-wider ${levelStyle[result.level]}`}>
              {result.level}
            </span>
            <p className="max-w-[65ch]">
              <span className="font-semibold">
                {first} + {second.toLowerCase()}
              </span>{" "}
              : {result.text}
            </p>
          </div>
        ) : (
          <p className="max-w-[65ch]">
            <span className="font-semibold">
              {first} + {second.toLowerCase()}
            </span>{" "}
            : aucune interaction dans les données de la démo.
          </p>
        )}
      </div>
    </section>
  );
}

function DrugSelect({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-md border border-line bg-bg px-3 text-base font-normal"
      >
        {drugs.map((drug) => (
          <option key={drug}>{drug}</option>
        ))}
      </select>
    </label>
  );
}
