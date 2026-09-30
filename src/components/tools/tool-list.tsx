import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import type { Tool } from "@/lib/tools";

// Liste dense des outils : une ligne par outil plutôt qu'une grille de cartes.
export function ToolList({ tools }: { tools: Tool[] }) {
  return (
    <Reveal className="flex flex-col border-t border-line">
      {tools.map((tool) => (
        <Link
          key={tool.slug}
          href={`/outils/${tool.slug}`}
          className="group grid gap-1 border-b border-line py-5 transition-colors duration-150 hover:bg-surface md:grid-cols-[14rem_1fr_9rem_1.5rem] md:items-center md:gap-6 md:px-3"
        >
          <span className="font-semibold">{tool.name}</span>
          <span className="text-sm text-muted">{tool.summary}</span>
          <span className="font-mono text-xs uppercase tracking-wider text-muted">{tool.category}</span>
          <ArrowUpRight
            size={18}
            className="hidden text-muted transition-colors duration-150 group-hover:text-accent md:block"
            aria-hidden
          />
        </Link>
      ))}
    </Reveal>
  );
}
