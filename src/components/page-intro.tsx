// En-tête commun aux pages intérieures (Outils, Tarifs, Contact)
export function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="flex max-w-3xl flex-col gap-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-accent">{eyebrow}</p>
      <h1 className="font-display text-[2.5rem] leading-none font-semibold tracking-tight md:text-h1">{title}</h1>
      <p className="max-w-[65ch] text-base text-muted md:text-xl">{text}</p>
    </div>
  );
}
