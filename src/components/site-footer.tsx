import Link from "next/link";
import { tools } from "@/lib/tools";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-12 md:grid-cols-[2fr_1fr_1fr] md:px-8">
        <div className="flex max-w-sm flex-col gap-3">
          <span className="font-display text-xl font-semibold">Yak AI</span>
          <p className="text-sm text-muted">
            Des outils d&apos;IA pour la pharmacie d&apos;officine. L&apos;IA propose, le pharmacien
            valide.
          </p>
        </div>
        <FooterColumn title="Outils">
          {tools.slice(0, 4).map((tool) => (
            <Link key={tool.slug} href={`/outils/${tool.slug}`} className="hover:text-ink">
              {tool.name}
            </Link>
          ))}
        </FooterColumn>
        <FooterColumn title="Yak AI">
          <Link href="/outils" className="hover:text-ink">Tous les outils</Link>
          <Link href="/tarifs" className="hover:text-ink">Tarifs</Link>
          <Link href="/contact" className="hover:text-ink">Contact</Link>
        </FooterColumn>
      </div>
      <div className="mx-auto max-w-[1200px] border-t border-line px-5 py-6 text-xs text-muted md:px-8">
        © 2026 Yak AI. Site de démonstration : les données affichées sont des exemples.
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 text-sm text-muted">
      <span className="text-xs font-semibold uppercase tracking-wider text-ink">{title}</span>
      {children}
    </div>
  );
}
