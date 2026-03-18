import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // Optional: for interaction
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; // Required for loading gltf models

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); // Enable alpha for transparent background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 3); // Position the camera to view the person model

// Add lighting to make the model visible
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 5, 3);
scene.add(directionalLight);

// Optional: Add controls to move around the scene
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 1, 0); // Point controls to center of model
controls.update();

const loader = new GLTFLoader();

loader.load(
    'path/to/your_person_model.gltf', // Path to your model file
    function (gltf) {
        const personModel = gltf.scene;
        scene.add(personModel);
        // You can also access animations here if available
    },
    // Optional: called while loading is progressing
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // Optional: called when loading has errors
    function (error) {
        console.error('An error happened', error);
    }
);

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }
    return needResize;
}

function animate() {
    requestAnimationFrame(animate);
    resizeRendererToDisplaySize(renderer);
    controls.update(); // Update controls in the animation loop
    renderer.render(scene, camera);
}

animate();
