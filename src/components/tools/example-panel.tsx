import type { ExampleRow, Tool } from "@/lib/tools";

const toneDot: Record<NonNullable<ExampleRow["tone"]>, string> = {
  ok: "bg-accent",
  warn: "bg-warn",
  danger: "bg-danger",
};

// Aperçu d'un résultat de l'outil, avec des données d'exemple
export function ExamplePanel({ example }: { example: Tool["example"] }) {
  return (
    <figure className="flex flex-col self-start rounded-lg border border-line bg-surface">
      <figcaption className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
        <span className="font-semibold">{example.title}</span>
        <span className="font-mono text-xs uppercase tracking-wider text-muted">Exemple</span>
      </figcaption>
      <ul className="flex flex-col">
        {example.rows.map((row) => (
          <li key={row.label} className="flex gap-3 border-b border-line px-5 py-4 last:border-b-0">
            {row.tone && (
              <span className={`mt-2 size-2 shrink-0 rounded-full ${toneDot[row.tone]}`} aria-hidden />
            )}
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-medium">{row.label}</span>
                {row.confidence !== undefined && (
                  <span
                    className={`font-mono text-xs tabular-nums ${row.confidence < 80 ? "text-warn" : "text-muted"}`}
                  >
                    {row.confidence} %
                  </span>
                )}
              </div>
              <span className="text-sm text-muted">{row.value}</span>
            </div>
          </li>
        ))}
      </ul>
    </figure>
  );
}
