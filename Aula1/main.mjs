import * as THREE from "https://esm.sh/three";
import { OrbitControls } from "https://esm.sh/three/addons/controls/OrbitControls.js";

let scene, camera, renderer, cube, controls, cube_azul, esfera, cone;

function init() {
  // Cena
  scene = new THREE.Scene();

  // Câmera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Renderizador
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Geometria do cubo
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  
  // Segundo cubo azul
  const geometry_azul = new THREE.BoxGeometry();
  const material_azul = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  cube_azul = new THREE.Mesh(geometry_azul, material_azul);
  scene.add(cube_azul);
  cube_azul.position.x = 2; //Posição do segundo cubo no x

  // Esfera no eixo x
  const geometry_esfera = new THREE.SphereGeometry();
  const material_esfera = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  esfera = new THREE.Mesh(geometry_esfera, material_esfera);
  scene.add(esfera);
  esfera.position.x = -2; //Posição da esfera no x

  // Cone no eixo y
  const geometry_cone = new THREE.ConeGeometry();
  const material_cone = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  cone = new THREE.Mesh(geometry_cone, material_cone);
  scene.add(cone);
  cone.position.y = 2; //Posição do cone no y

  // Controle orbital
 controls = new OrbitControls(camera, renderer.domElement);

  // helper
  scene.add(new THREE.AxesHelper(30));

  // Função de animação
  animate();
}

function animate() {
  requestAnimationFrame(animate);

  // Rotação do cubo
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  cube_azul.rotation.x += 0.05;

  esfera.rotation.y += 0.4;

  cone.rotation.x += 0.2;

  controls.update();
  renderer.render(scene, camera);
}

init();