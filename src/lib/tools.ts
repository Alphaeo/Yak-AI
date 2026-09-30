// Catalogue des outils Yak AI. Une seule source de données pour l'accueil,
// la page Outils et les fiches /outils/[slug].

export const categories = ["Dispensation", "Sécurité", "Stock", "Patient", "Gestion"] as const;
export type Category = (typeof categories)[number];

export type ExampleRow = {
  label: string;
  value: string;
  /** Confiance de l'IA en %, affichée quand l'outil extrait des données */
  confidence?: number;
  tone?: "ok" | "warn" | "danger";
};

export type Tool = {
  slug: string;
  name: string;
  category: Category;
  summary: string;
  description: string;
  input: string;
  output: string;
  example: { title: string; rows: ExampleRow[] };
};

export const tools: Tool[] = [
  {
    slug: "lecture-ordonnance",
    name: "Lecture d'ordonnance",
    category: "Dispensation",
    summary: "Transforme une ordonnance scannée, même manuscrite, en lignes prêtes à saisir dans le LGO.",
    description:
      "Photographiez ou scannez l'ordonnance au comptoir. Yak AI repère chaque ligne (DCI, dosage, posologie, durée) et indique son niveau de confiance. Les lignes peu lisibles sont signalées pour que vous gardiez la main sur la saisie.",
    input: "Scan ou photo d'ordonnance",
    output: "Lignes structurées + confiance",
    example: {
      title: "Ordonnance du 24/09/2026",
      rows: [
        { label: "Amoxicilline 1 g", value: "1 cp matin et soir, 6 jours", confidence: 98, tone: "ok" },
        { label: "Paracétamol 1 g", value: "1 cp si douleur, 3 par jour max.", confidence: 96, tone: "ok" },
        { label: "Ibuprofène 400 mg", value: "Posologie peu lisible, à vérifier", confidence: 71, tone: "warn" },
      ],
    },
  },
  {
    slug: "controle-interactions",
    name: "Contrôle des interactions",
    category: "Sécurité",
    summary: "Croise l'ordonnance avec l'historique du patient et classe chaque interaction selon les niveaux ANSM.",
    description:
      "À chaque dispensation, Yak AI compare les nouvelles lignes avec les traitements en cours du dossier patient. Chaque alerte indique son niveau (contre-indication, association déconseillée, précaution d'emploi, à prendre en compte), le mécanisme et la conduite à tenir.",
    input: "Ordonnance + dossier patient",
    output: "Alertes classées par gravité",
    example: {
      title: "Patient de 78 ans sous warfarine",
      rows: [
        { label: "Warfarine + ibuprofène", value: "Association déconseillée : risque hémorragique", tone: "danger" },
        { label: "Warfarine + paracétamol", value: "Précaution d'emploi aux doses maximales", tone: "warn" },
        { label: "Amoxicilline", value: "Aucune interaction avec le traitement en cours", tone: "ok" },
      ],
    },
  },
  {
    slug: "prevision-commandes",
    name: "Prévision de commandes",
    category: "Stock",
    summary: "Prévoit la demande par référence et prépare la commande grossiste de la semaine.",
    description:
      "Yak AI apprend de vos ventes, de la saison et des épidémies en cours pour prévoir la demande à 7 jours. Il propose une commande par grossiste, que vous validez ligne par ligne.",
    input: "Historique de ventes du LGO",
    output: "Commande suggérée à valider",
    example: {
      title: "Commande suggérée, semaine 41",
      rows: [
        { label: "Paracétamol 1 g, boîte de 8", value: "Stock 42 · prévu 96 · commander 60", tone: "warn" },
        { label: "Sérum physiologique, 40 unidoses", value: "Stock 30 · prévu 55 · commander 30", tone: "warn" },
        { label: "Amoxicilline 1 g, boîte de 6", value: "Stock 38 · prévu 31 · rien à commander", tone: "ok" },
      ],
    },
  },
  {
    slug: "veille-ruptures",
    name: "Veille ruptures",
    category: "Stock",
    summary: "Surveille les ruptures et tensions d'approvisionnement, et liste les alternatives disponibles.",
    description:
      "Chaque matin, Yak AI croise les signalements de ruptures avec votre stock et vos ventes. Pour chaque produit concerné, il liste les alternatives disponibles chez vos grossistes et ce qui nécessite l'accord du prescripteur.",
    input: "Stock + signalements de ruptures",
    output: "Produits exposés + alternatives",
    example: {
      title: "Veille du 30/09/2026",
      rows: [
        { label: "Amoxicilline 250 mg/5 ml, susp. buvable", value: "Tension signalée · 2 alternatives en stock grossiste", tone: "warn" },
        { label: "Insuline, stylo prérempli", value: "Rupture · accord du prescripteur requis", tone: "danger" },
        { label: "Salbutamol, aérosol doseur", value: "Approvisionnement normal", tone: "ok" },
      ],
    },
  },
  {
    slug: "assistant-conseil",
    name: "Assistant de conseil",
    category: "Patient",
    summary: "Répond aux questions du comptoir en citant ses sources (RCP, recommandations).",
    description:
      "Posez la question comme elle vient au comptoir. Yak AI répond en quelques lignes et cite les documents utilisés. Il signale quand la situation demande une orientation vers le médecin.",
    input: "Question en langage courant",
    output: "Réponse courte + sources",
    example: {
      title: "« Patiente enceinte de 22 SA, maux de tête »",
      rows: [
        { label: "Première intention", value: "Paracétamol, à la dose minimale efficace", tone: "ok" },
        { label: "À éviter", value: "AINS contre-indiqués à partir de 24 SA", tone: "danger" },
        { label: "Sources", value: "RCP paracétamol · CRAT" },
      ],
    },
  },
  {
    slug: "bilan-medication",
    name: "Bilan partagé de médication",
    category: "Patient",
    summary: "Prépare la synthèse du bilan de médication à partir de l'historique de dispensation.",
    description:
      "Avant l'entretien, Yak AI rassemble les traitements du patient et repère les points à aborder : doublons, traitements au long cours à réévaluer, questions d'observance. Vous gardez la main sur ce que vous transmettez au médecin.",
    input: "Historique de dispensation",
    output: "Synthèse à relire avant l'entretien",
    example: {
      title: "Patiente de 81 ans, 9 lignes de traitement",
      rows: [
        { label: "Doublon possible", value: "Deux IPP délivrés sur la même période", tone: "warn" },
        { label: "À réévaluer", value: "Benzodiazépine au long cours depuis 2 ans", tone: "warn" },
        { label: "Observance", value: "Renouvellements réguliers sur les 6 derniers mois", tone: "ok" },
      ],
    },
  },
  {
    slug: "fiches-bon-usage",
    name: "Fiches de bon usage",
    category: "Patient",
    summary: "Génère une fiche imprimable en langage simple pour chaque traitement délivré.",
    description:
      "À partir de l'ordonnance, Yak AI rédige une fiche d'une page : quand prendre le médicament, combien de temps, et quand rappeler la pharmacie. Vous la relisez et l'imprimez au comptoir.",
    input: "Ordonnance validée",
    output: "Fiche A5 à imprimer",
    example: {
      title: "Votre antibiotique : amoxicilline",
      rows: [
        { label: "Quand ?", value: "Matin et soir, au début du repas" },
        { label: "Combien de temps ?", value: "6 jours, même si vous allez mieux" },
        { label: "Appelez-nous si", value: "Éruption sur la peau ou diarrhée importante", tone: "warn" },
      ],
    },
  },
  {
    slug: "rejets-tiers-payant",
    name: "Rejets de tiers payant",
    category: "Gestion",
    summary: "Analyse les rejets de facturation et propose la correction pour chacun.",
    description:
      "Yak AI lit les retours de facturation, regroupe les rejets par cause et prépare la correction : relance de la mutuelle, complément de dossier ou refacturation. Les corrections simples sont prêtes en un clic.",
    input: "Retours de facturation",
    output: "Rejets triés + corrections",
    example: {
      title: "Lot du 22/09/2026, 14 rejets",
      rows: [
        { label: "Droits complémentaire expirés", value: "6 rejets · relance mutuelle préparée", tone: "warn" },
        { label: "Identifiant prescripteur manquant", value: "5 rejets · corrigés, prêts à renvoyer", tone: "ok" },
        { label: "Produit non remboursable", value: "3 rejets · à régler par le patient", tone: "danger" },
      ],
    },
  },
];

export function getTool(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}
