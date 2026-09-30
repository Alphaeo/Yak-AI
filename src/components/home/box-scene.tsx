"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, useGLTF } from "@react-three/drei";
import { Mesh, MeshStandardMaterial, type Group } from "three";

const MODEL_URL = "/models/medicine-box.glb";

// Valeurs animées par GSAP (voir box-story.tsx) et lues à chaque image par la scène.
export type BoxAnim = {
  camZ: number; // distance de la caméra : plus petit = zoom
  posX: number;
  posY: number;
  rotX: number;
  rotY: number;
  float: number; // amplitude du flottement (0 = immobile)
};

function MedicineBox({ anim }: { anim: RefObject<BoxAnim> }) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(MODEL_URL);

  // Le GLB généré ne précise pas `metallicFactor` : glTF le considère alors 100 % métallique,
  // et sans reflets autour, le métal paraît noir. On le repasse en carton mat.
  useLayoutEffect(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
        child.material.metalness = 0;
        child.material.roughness = 0.85;
      }
    });
  }, [scene]);

  // Boucle d'animation de React Three Fiber : l'équivalent de ton requestAnimationFrame
  useFrame((state) => {
    const a = anim.current;
    const bob = Math.sin(state.clock.elapsedTime * 1.2) * 0.08 * a.float;
    group.current!.position.set(a.posX, a.posY + bob, 0);
    group.current!.rotation.set(a.rotX, a.rotY, 0);
    state.camera.position.set(0, 0, a.camZ);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group} scale={1.6}>
      <primitive object={scene} />
    </group>
  );
}

export default function BoxScene({ anim }: { anim: RefObject<BoxAnim> }) {
  // L'ombre prend la couleur d'encre définie dans les tokens CSS
  const ink = getComputedStyle(document.documentElement).getPropertyValue("--ink").trim();

  return (
    // `flat` coupe le tone mapping, qui ternit les blancs du carton
    <Canvas flat camera={{ fov: 35, position: [0, 0, 6] }} dpr={[1, 2]} aria-hidden>
      <ambientLight intensity={2} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <directionalLight position={[-4, 2, -2]} intensity={0.6} />
      <MedicineBox anim={anim} />
      <ContactShadows position={[0, -1.2, 0]} opacity={0.25} scale={8} blur={2.5} far={3} color={ink} />
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL);
