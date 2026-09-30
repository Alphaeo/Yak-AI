import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { ContactForm } from "@/components/contact/contact-form";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Demander une démo",
  description: "Demandez une démonstration de Yak AI pour votre officine.",
};

export default async function ContactPage(props: PageProps<"/contact">) {
  // Les liens « Tester cet outil » passent l'outil dans l'URL : ?outil=lecture-ordonnance
  const { outil } = await props.searchParams;
  const preselected = tools.find((tool) => tool.slug === outil)?.slug;

  return (
    <div className="mx-auto grid max-w-[1200px] gap-12 px-5 pt-16 pb-24 md:grid-cols-[1fr_32rem] md:px-8">
      <div className="flex flex-col gap-10">
        <PageIntro
          eyebrow="Démo"
          title="Voyons Yak AI dans votre officine"
          text="30 minutes en visio, sur vos propres cas : ordonnances, commandes, rejets. Nous vous rappelons sous un jour ouvré."
        />
        <dl className="grid max-w-md gap-6 border-t border-line pt-6 text-sm">
          <div className="flex flex-col gap-1">
            <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Téléphone</dt>
            <dd className="font-mono">01 00 00 00 00</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-xs font-semibold uppercase tracking-wider text-muted">E-mail</dt>
            <dd className="font-mono">demo@yak-ai.example</dd>
          </div>
        </dl>
      </div>
      <ContactForm defaultTool={preselected} />
    </div>
  );
}
