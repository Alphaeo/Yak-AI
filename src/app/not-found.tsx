import { ButtonLink } from "@/components/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-6 px-5 py-24 md:px-8">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="font-display text-h2 font-semibold tracking-tight">Cette page n&apos;existe pas</h1>
      <p className="text-muted">Le lien est peut-être ancien. Les outils sont tous listés sur la page Outils.</p>
      <ButtonLink href="/outils">Voir les outils</ButtonLink>
    </div>
  );
}
