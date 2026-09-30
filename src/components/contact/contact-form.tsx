"use client";

import { useActionState } from "react";
import { requestDemo, type ContactState } from "@/app/contact/actions";
import { buttonClass } from "@/components/button";
import { tools } from "@/lib/tools";

const initialState: ContactState = { status: "idle" };

export function ContactForm({ defaultTool }: { defaultTool?: string }) {
  const [state, formAction, pending] = useActionState(requestDemo, initialState);
  const values = state.values;

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col gap-3 self-start rounded-lg border border-accent bg-surface p-6">
        <p className="font-semibold">Demande enregistrée</p>
        <p className="text-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5 self-start rounded-lg border border-line bg-surface p-6">
      <Field name="name" label="Nom" autoComplete="name" defaultValue={values?.name} error={state.errors?.name} />
      <Field
        name="pharmacy"
        label="Officine"
        autoComplete="organization"
        placeholder="Pharmacie du Marché, Lyon"
        defaultValue={values?.pharmacy}
        error={state.errors?.pharmacy}
      />
      <Field
        name="email"
        label="E-mail professionnel"
        type="email"
        autoComplete="email"
        defaultValue={values?.email}
        error={state.errors?.email}
      />
      <label className="flex flex-col gap-2 text-sm font-medium">
        Outil qui vous intéresse
        <select
          name="tool"
          key={values?.tool}
          defaultValue={values?.tool ?? defaultTool ?? ""}
          className="h-11 rounded-md border border-line bg-bg px-3 text-base font-normal"
        >
          <option value="">Pas encore décidé</option>
          {tools.map((tool) => (
            <option key={tool.slug} value={tool.slug}>
              {tool.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium">
        Message <span className="font-normal text-muted">(facultatif)</span>
        <textarea name="message" rows={4} defaultValue={values?.message} className="rounded-md border border-line bg-bg px-3 py-2 text-base font-normal" />
      </label>
      <button type="submit" disabled={pending} className={buttonClass()}>
        {pending ? "Envoi en cours…" : "Demander une démo"}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  error,
  ...props
}: { name: string; label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium">
      {label}
      <input
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-erreur` : undefined}
        className={`h-11 rounded-md border bg-bg px-3 text-base font-normal ${error ? "border-danger" : "border-line"}`}
        {...props}
      />
      {error && (
        <span id={`${name}-erreur`} className="text-sm font-normal text-danger">
          {error}
        </span>
      )}
    </label>
  );
}
