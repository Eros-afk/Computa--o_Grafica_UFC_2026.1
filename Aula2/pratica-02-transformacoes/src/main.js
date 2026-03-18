import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// são declaradas as variáveis no escopo do módulo
let scene, camera, renderer, controls;
let sun, earth, moon, saturn, satellite;

function init() {
  // é instanciada a cena principal
  scene = new THREE.Scene();

  // é configurada a câmera de perspectiva
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // é recuada a câmera um pouco mais para visualizar o sistema inteiro
  camera.position.set(0, 10, 25);
  camera.lookAt(0, 0, 0);

  // é inicializado o renderizador webgl
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // são definidas as geometrias e os materiais base para os astros esféricos
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
  const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  const earthMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
  const saturnMaterial = new THREE.MeshBasicMaterial({ color: 0xffaa00 });

  // é construído o sol e posicionado no centro do mundo
  sun = new THREE.Mesh(sphereGeometry, sunMaterial);
  sun.scale.set(5, 5, 5);
  scene.add(sun);

  // é construída a terra e adicionada como filha do sol
  earth = new THREE.Mesh(sphereGeometry, earthMaterial);
  earth.position.x = 7;
  earth.scale.set(0.5, 0.5, 0.5);
  sun.add(earth);

  // é construída a lua e adicionada como filha da terra
  moon = new THREE.Mesh(sphereGeometry, moonMaterial);
  moon.position.x = 2;
  moon.scale.set(0.3, 0.3, 0.3);
  earth.add(moon);

  // ==========================================================
  // EXERCÍCIO 1: Descomente o bloco abaixo para criar Saturno
  // ==========================================================
  
  // é construído saturno e adicionado como filho do sol em uma órbita mais distante
  // saturn = new THREE.Mesh(sphereGeometry, saturnMaterial);
  // saturn.position.x = 14;
  // saturn.scale.set(0.8, 0.8, 0.8);
  // sun.add(saturn);

  // // é construído o anel de saturno usando geometria de rosca
  // const ringGeometry = new THREE.TorusGeometry(1.5, 0.2, 16, 100);
  // const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xffccaa });
  // const saturnRing = new THREE.Mesh(ringGeometry, ringMaterial);
  // // é rotacionado o anel em 90 graus (pi / 2 radianos) no eixo x para deitá-lo
  // saturnRing.rotation.x = Math.PI / 2;
  // saturn.add(saturnRing);

  // ==========================================================
  // EXERCÍCIO 2: Descomente o bloco abaixo para criar o Satélite
  // ==========================================================
  
  // // é instanciado um grupo vazio para compor o satélite artificial
  // satellite = new THREE.Group();

  // // são construídas as partes individuais do satélite (corpo e painéis)
  // const bodyGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  // const panelGeometry = new THREE.BoxGeometry(2, 0.1, 0.4);
  // const grayMaterial = new THREE.MeshBasicMaterial({ color: 0x888888 });
  // const blueMaterial = new THREE.MeshBasicMaterial({ color: 0x2222ff });

  // const satelliteBody = new THREE.Mesh(bodyGeometry, grayMaterial);
  // const satellitePanels = new THREE.Mesh(panelGeometry, blueMaterial);

  // // são agrupadas as peças dentro do grupo pai
  // satellite.add(satelliteBody);
  // satellite.add(satellitePanels);

  // // é posicionado o satélite inteiro e adicionado como filho da terra
  // satellite.position.set(0, 2, 0);
  // earth.add(satellite);

  // é inicializado o controle de órbita da câmera
  controls = new OrbitControls(camera, renderer.domElement);

  // são adicionados os eixos visuais auxiliares
  scene.add(new THREE.AxesHelper(15));
  sun.add(new THREE.AxesHelper(2));
  earth.add(new THREE.AxesHelper(2));

  // é registrado o ouvinte para o redimensionamento da janela
  window.addEventListener('resize', onWindowResize);

  // é chamado o laço de animação
  animate();
}

function onWindowResize() {
  // é atualizada a proporção da câmera de acordo com a nova janela
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // é ajustado o tamanho do renderizador
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  // é agendado o próximo quadro de renderização
  requestAnimationFrame(animate);

  // é registrado o tempo decorrido para usar em animações orgânicas
  const time = Date.now() * 0.001;

  // é aplicada a rotação linear padrão nos astros
  sun.rotation.y += 0.005;
  earth.rotation.y += 0.02;
  
  // EXERCÍCIO 1: Descomente para animar Saturno
  // saturn.rotation.y += 0.01;

  // EXERCÍCIO 2: Descomente para animar o Satélite
  // // é rotacionado o satélite em seu próprio eixo
  // satellite.rotation.y += 0.05;
  // // é calculada a flutuação do satélite no eixo y usando a função seno sobre o tempo
  // satellite.position.y = 2 + Math.sin(time * 2) * 0.5;

  // são atualizados os controles da câmera
  controls.update();

  // é renderizado o quadro atual
  renderer.render(scene, camera);
}

// é iniciada a aplicação
init();
