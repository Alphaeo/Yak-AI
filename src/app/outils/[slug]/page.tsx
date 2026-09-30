import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/button";
import { ExamplePanel } from "@/components/tools/example-panel";
import { InteractionChecker } from "@/components/tools/interaction-checker";
import { ToolList } from "@/components/tools/tool-list";
import { getTool, tools } from "@/lib/tools";

// Une page par outil, générée au build
export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata(props: PageProps<"/outils/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const tool = getTool(slug);
  return tool ? { title: tool.name, description: tool.summary } : {};
}

export default async function ToolPage(props: PageProps<"/outils/[slug]">) {
  const { slug } = await props.params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const related = tools.filter((other) => other.category === tool.category && other.slug !== tool.slug);

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-16 px-5 pt-10 pb-24 md:px-8">
      <Link href="/outils" className="inline-flex items-center gap-2 self-start text-sm text-muted hover:text-ink">
        <ArrowLeft size={16} /> Tous les outils
      </Link>

      <div className="grid gap-12 md:grid-cols-[1fr_28rem]">
        <div className="flex flex-col gap-6">
          <p className="font-mono text-xs uppercase tracking-wider text-accent">{tool.category}</p>
          <h1 className="font-display text-[2.5rem] leading-none font-semibold tracking-tight md:text-h1">
            {tool.name}
          </h1>
          <p className="max-w-[65ch] text-xl">{tool.summary}</p>
          <p className="max-w-[65ch] text-muted">{tool.description}</p>
          <dl className="grid max-w-lg grid-cols-2 gap-6 border-t border-line pt-6">
            <div className="flex flex-col gap-1">
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Entrée</dt>
              <dd>{tool.input}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Résultat</dt>
              <dd>{tool.output}</dd>
            </div>
          </dl>
          <ButtonLink href={`/contact?outil=${tool.slug}`} className="self-start">
            Demander un essai
          </ButtonLink>
        </div>

        <ExamplePanel example={tool.example} />
      </div>

      {tool.slug === "controle-interactions" && <InteractionChecker />}

      {related.length > 0 && (
        <section className="flex flex-col gap-6">
          <h2 className="font-display text-h3 font-semibold tracking-tight">Dans la même catégorie</h2>
          <ToolList tools={related} />
        </section>
      )}
    </div>
  );
}
