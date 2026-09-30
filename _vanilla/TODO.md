# Apprendre Three.js — TODO

Règle : tu écris le code, je relis et j'explique. Coche `[x]` quand c'est fait.
Pour tester : dans un terminal ouvert dans ce dossier, lance `pnpm dev`, puis ouvre l'adresse affichée
(`http://localhost:5173`). La page se recharge toute seule à chaque sauvegarde. `Ctrl+C` pour arrêter.
Écran blanc ? F12 → onglet Console pour voir l'erreur.

Déjà installé : `three` (la lib 3D) et `vite` (le serveur de dev), voir `package.json`.
Après un `git clone` ou si `node_modules` disparaît : `pnpm install`.

---

## Étape 1 — Afficher un cube (le trio de base)

Fichiers : crée `index.html` et `main.js`.

- [ ] `index.html` (à la racine du dossier, c'est là que Vite le cherche) : une page vide qui charge
      `main.js` avec `<script type="module" src="/main.js"></script>`
- [ ] `main.js` : `import * as THREE from 'three'`
- [ ] Crée une `THREE.Scene`
- [ ] Crée une `THREE.PerspectiveCamera` (fov 45, ratio = largeur/hauteur de la fenêtre) et recule-la (`position.z`)
- [ ] Crée un `THREE.WebGLRenderer`, donne-lui la taille de la fenêtre, ajoute son `domElement` dans le `body`
- [ ] Crée un cube : `BoxGeometry` + `MeshBasicMaterial` → `Mesh`, ajoute-le à la scène
- [ ] Appelle `renderer.render(scene, camera)` une fois

✅ Objectif : un carré de couleur au milieu de l'écran.

## Étape 2 — L'animer

- [ ] Remplace le `render` unique par `renderer.setAnimationLoop(...)`
- [ ] Dans la boucle, fais tourner le cube (`rotation.x`, `rotation.y`)
- [ ] Bonus : utilise le paramètre `time` de la boucle pour une vitesse constante

## Étape 3 — Lumière et matériaux

- [ ] Remplace `MeshBasicMaterial` par `MeshStandardMaterial` → que se passe-t-il ?
- [ ] Ajoute une `DirectionalLight` et une `AmbientLight`
- [ ] Essaie `MeshToonMaterial` : c'est le début du look "stylisé"
- [ ] Remplace le cube par une autre géométrie (`TorusKnotGeometry`, `SphereGeometry`…)

## Étape 4 — Responsive

- [ ] Écoute l'événement `resize` de `window`
- [ ] Mets à jour `camera.aspect`, appelle `camera.updateProjectionMatrix()`, redimensionne le renderer
- [ ] CSS : `body { margin: 0 }` et plus de barre de scroll parasite

## Étape 5 — Lier au scroll

- [x] Ajoute 3 `<section>` de 100vh avec du texte
- [x] Mets le canvas en `position: fixed` derrière le texte
- [x] Calcule une progression entre 0 et 1 selon le scroll
- [x] Utilise-la dans la boucle pour bouger/tourner l'objet

## Étape 6 — Charger ta boîte de médicament

Le modèle est dans `public/models/medicine-box.glb` (Vite sert `public/` à la racine du site,
donc son URL est `/models/medicine-box.glb`). Taille ≈ 1 unité, centré sur l'origine.

- [x] Importe `GLTFLoader` depuis `three/addons/loaders/GLTFLoader.js`
- [x] Charge le fichier avec `loader.load(url, (gltf) => { ... })`
- [x] Ajoute `gltf.scene` à la scène (à la place du cube)
- [x] Le modèle arrive avec sa texture et son matériau : il lui faut juste des lumières (étape 3) pour être visible
- [x] Branche-le sur ton animation de scroll de l'étape 5

---

## Plus tard (quand tout ça est acquis)

- Retoucher le modèle dans Blender (couleurs, arêtes plus nettes, style toon)
- `OrbitControls` pour tourner autour avec la souris
- GSAP + ScrollTrigger + Lenis pour des animations de scroll pro
- Post-processing (bloom, grain) et premiers shaders
