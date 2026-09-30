import type { Metadata } from "next";
import { ToolCatalog } from "@/components/tools/tool-catalog";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Outils",
  description: "Les huit outils d'IA de Yak AI pour la pharmacie d'officine.",
};

export default function ToolsPage() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-5 pt-16 pb-24 md:px-8">
      <PageIntro
        eyebrow="Outils"
        title="Un outil par tâche de l'officine"
        text="Chaque outil fonctionne seul et se branche sur votre logiciel d'officine. Commencez par un, ajoutez les autres quand vous voulez."
      />
      <ToolCatalog />
    </div>
  );
}
