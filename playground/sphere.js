import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

let scene, camera, renderer, dodecahedron, isSpinning = true;

function init() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable transparency
    renderer.setSize(window.innerWidth * 0.9, window.innerHeight * 0.7); // Set size to 90vw and 70vh
    renderer.setClearColor(0x000000, 0); // Set background to transparent
    document.getElementById('sphere').appendChild(renderer.domElement);

    // Dodecahedron geometry
    const geometry = new THREE.DodecahedronGeometry(5);

    // Load textures for each face of the dodecahedron
    const loader = new THREE.TextureLoader();
    const materials = [
        createMaterial('../img/topper/topper_0.jpg'),
        createMaterial('../img/topper/topper_1.jpg'),
        createMaterial('../img/topper/topper_2.jpg'),
        createMaterial('../img/topper/topper_3.jpg'),
        createMaterial('../img/topper/topper_4.jpg'),
        createMaterial('../img/topper/topper_5.jpg'),
        createMaterial('../img/topper/topper_6.jpg'),
        createMaterial('../img/topper/topper_7.jpg'),
        createMaterial('../img/topper/topper_8.jpg'),
        createMaterial('../img/topper/topper_9.jpg'),
        createMaterial('../img/topper/topper_10.jpg'),
        createMaterial('../img/topper/topper_11.jpg')
    ];

    dodecahedron = new THREE.Mesh(geometry, materials);
    scene.add(dodecahedron);

    camera.position.z = 10;

    // Animation loop
    animate();

    // Event listeners for hover and tap
    renderer.domElement.addEventListener('mouseover', () => isSpinning = false);
    renderer.domElement.addEventListener('mouseout', () => isSpinning = true);
    renderer.domElement.addEventListener('click', () => isSpinning = !isSpinning);
}

function createMaterial(path) {
    const texture = new THREE.TextureLoader().load(path);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearFilter;
    return new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
}

function animate() {
    requestAnimationFrame(animate);

    if (isSpinning) {
        dodecahedron.rotation.y += 0.001;
    }

    renderer.render(scene, camera);
}

init();