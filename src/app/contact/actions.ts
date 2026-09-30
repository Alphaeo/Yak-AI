"use server";

export type ContactState = {
  status: "idle" | "error" | "success";
  message?: string;
  errors?: Partial<Record<"name" | "pharmacy" | "email", string>>;
  /** Valeurs saisies, renvoyées pour que le formulaire ne se vide pas en cas d'erreur */
  values?: Record<string, string>;
};

// Action serveur appelée à l'envoi du formulaire.
// Site de démo : la demande est validée puis affichée dans le terminal, aucun e-mail n'est envoyé.
export async function requestDemo(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const pharmacy = String(formData.get("pharmacy") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  const errors: ContactState["errors"] = {};
  if (!name) errors.name = "Indiquez votre nom.";
  if (!pharmacy) errors.pharmacy = "Indiquez le nom de votre officine.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Adresse e-mail invalide, par exemple nom@officine.fr.";

  if (Object.keys(errors).length > 0) {
    const values = Object.fromEntries([...formData].map(([key, value]) => [key, String(value)]));
    return { status: "error", errors, values };
  }

  console.log("[demande de démo]", Object.fromEntries(formData));
  return {
    status: "success",
    message: `Merci ${name}, la demande pour ${pharmacy} est bien enregistrée. Site de démonstration : aucun e-mail n'est envoyé.`,
  };
}
