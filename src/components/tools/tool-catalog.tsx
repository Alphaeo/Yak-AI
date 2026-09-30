"use client";

import { useState } from "react";
import { categories, tools, type Category } from "@/lib/tools";
import { ToolList } from "./tool-list";

// Catalogue filtrable par catégorie
export function ToolCatalog() {
  const [category, setCategory] = useState<Category | "Tous">("Tous");
  const visible = category === "Tous" ? tools : tools.filter((tool) => tool.category === category);

  return (
    <div className="flex flex-col gap-6">
      <div role="group" aria-label="Filtrer par catégorie" className="flex flex-wrap gap-2">
        {(["Tous", ...categories] as const).map((item) => {
          const count = item === "Tous" ? tools.length : tools.filter((tool) => tool.category === item).length;
          const active = item === category;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={active}
              onClick={() => setCategory(item)}
              className={`h-9 rounded-md border px-3.5 text-sm transition-colors duration-150 ${
                active ? "border-ink bg-ink text-surface" : "border-line bg-surface text-ink hover:border-ink"
              }`}
            >
              {item} <span className="ml-1 font-mono text-xs tabular-nums opacity-70">{count}</span>
            </button>
          );
        })}
      </div>
      {/* La key force un nouveau rendu pour rejouer l'apparition au changement de filtre */}
      <ToolList key={category} tools={visible} />
    </div>
  );
}
