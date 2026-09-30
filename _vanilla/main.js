import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;

// Lumières : sans elles, le modèle serait noir
scene.add(new THREE.AmbientLight(0xffffff, 1));
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(2, 3, 4);
scene.add(light);

// Boîte de médicament : null tant que le fichier n'est pas chargé
let box = null;
new GLTFLoader().load('/models/medicine-box.glb', (gltf) => {
    box = gltf.scene;
    box.scale.setScalar(2.5); // le modèle fait ~1 unité : on l'agrandit
    scene.add(box);
});

// Progression du scroll : 0 en haut de la page, 1 en bas
let progress = 0;
window.addEventListener('scroll', () => {
    progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);
    if (box) {
        box.rotation.y = progress * Math.PI * 2; // 1 tour complet sur toute la page
        box.position.x = Math.sin(progress * Math.PI) * 2; // part au centre, glisse à droite, revient
    }
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
