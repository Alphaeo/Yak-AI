@AGENTS.md

# Yak AI — contexte du projet

Site vitrine d'une plateforme (fictive pour l'instant) d'outils d'IA pour pharmacies d'officine.
Repo public : https://github.com/Alphaeo/Yak-AI (branche `main`).

## L'utilisateur
- Apprend le web 3D (Three.js) : expliquer simplement, en français, les choix non évidents.
- Pour les gros changements : proposer le plan en chat, attendre sa validation, puis coder.
- Il a d'abord écrit du Three.js vanilla lui-même : archivé dans `_vanilla/` (ne pas supprimer).

## Stack et commandes (pnpm)
- Next.js 16 (App Router, `src/`), React 19, TypeScript, Tailwind CSS 4.
- 3D : React Three Fiber + drei. Animations : GSAP + ScrollTrigger (`@gsap/react`). Scroll fluide : Lenis. Icônes : lucide-react.
- `pnpm dev` (dev, http://localhost:3000) · `pnpm build` puis `pnpm start` (version finale) · `pnpm lint`.
- Vérifier avant de livrer : `pnpm lint` + `pnpm build`, et des captures réelles (desktop + mobile 390 px).

## Structure
- `src/lib/tools.ts` : catalogue des 8 outils, source unique pour l'accueil, `/outils` et `/outils/[slug]`.
- `src/components/home/box-story.tsx` : récit au scroll de l'accueil (section 500vh + contenu `sticky`, timeline GSAP scrubée qui anime un objet `anim`).
- `src/components/home/box-scene.tsx` : scène R3F qui lit `anim` à chaque image (`useFrame`).
- `src/app/contact/actions.ts` : action serveur du formulaire (valide, log dans le terminal, **n'envoie rien**).
- `public/models/medicine-box.glb` : boîte de médicament générée par IA (Higgsfield, plan gratuit).

## Design
- Direction dans `DESIGN.md` ; tokens de couleur dans `src/app/globals.css` (`:root` + `@theme`). Aucune couleur en dur ailleurs.
- Suivre le skill `ui-taste` : accent vert unique, aligné à gauche, listes denses plutôt que grilles de cartes, textes de bouton = verbe + objet.
- Contenu en français, vocabulaire d'officine ; données d'exemple marquées « exemple ».

## Pièges connus
- Le GLB n'a pas de `metallicFactor` → glTF le traite comme 100 % métal (boîte noire). Corrigé au chargement dans `box-scene.tsx` (metalness 0).
- Tailwind 4 `translate-*` (propriété CSS `translate`) s'additionne au `y` de GSAP (`transform`) : laisser GSAP gérer seul les décalages animés (`fromTo`).
- Next 16 : `params` / `searchParams` sont des Promises (`await props.params`), types `PageProps<"/route">` générés par `next typegen`.
- Avertissement console `THREE.Clock deprecated` : vient de R3F, sans impact.

## Limites et pistes (discutées avec l'utilisateur)
- Tout est démo : outils non fonctionnels, prix / téléphone / e-mail fictifs, démo d'interactions limitée à 6 associations.
- Commercialisation : données patient → hébergement HDS + RGPD ; aide à la décision (interactions, conseil) → risque de statut dispositif médical ; interactions → base médicamenteuse agréée HAS, pas de LLM ; intégration LGO = partenariats.
- Modèles : prévision de commandes et interactions sans LLM ; OCR ordonnance via Mistral OCR ; conseil = RAG sur la base publique des médicaments avec sources ; petit modèle pour les fiches.
- Prochaine étape conseillée : faire tester le site à 3–5 pharmaciens, puis construire un premier outil sans données patient (veille ruptures ou prévision de commandes).
