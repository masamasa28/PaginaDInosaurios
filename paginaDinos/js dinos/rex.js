let scene, camera, renderer, controls, dinosaurModel;

function init() {
    scene = new THREE.Scene();

    // Configuración de la cámara
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / 2 / (window.innerHeight / 2), 0.1, 1000);
    camera.position.set(4, 20, 25); // Posición inicial de la cámara

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('dinosaurCanvas'), antialias: true });
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    renderer.shadowMap.enabled = true;

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    setupScene();
    addTrees();
    animate();
}

function setupScene() {
    // Fondo y luz
    scene.background = new THREE.Color(0x87CEEB);
    
    // Luz ambiental
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Luz direccional como el sol
    const sunLight = new THREE.DirectionalLight(0xffffff,20);
    sunLight.position.set(-10, -10, 0);
    sunLight.castShadow = true;
    scene.add(sunLight);

    // Luz puntual simulando una fuente de luz cálida
    const pointLight = new THREE.PointLight(0xffa95c, 2, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Suelo
    const planeGeometry = new THREE.PlaneGeometry(100, 100);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);
}

function addTrees() {
    const treeGeometry = new THREE.ConeGeometry(2.5, 9, 10);
    const treeMaterial = new THREE.MeshStandardMaterial({ color: 0x006400 });

    for (let i = 0; i < 20; i++) {
        const tree = new THREE.Mesh(treeGeometry, treeMaterial);
        tree.position.set(Math.random() * 80 - 20, 2.5, Math.random() * 40 - 20);
        tree.castShadow = true;
        scene.add(tree);
    }
}

function loadDinoModel(type) {
    // Eliminar el modelo actual si existe
    if (dinosaurModel) {
        scene.remove(dinosaurModel);
    }

    // Cargar el nuevo modelo
    const loader = new THREE.GLTFLoader();
    let modelPath = '';

    switch (type) {
        case 'rex':
            modelPath = '/paginaDinos/Rex_verde.glb';
            camera.position.set(30, 10, 4); 
             loader.load(modelPath, (gltf) => {
                 dinosaurModel = gltf.scene;
                 dinosaurModel.scale.set(0.5, 0.5, 0.5);
                 dinosaurModel.position.set(-10, 8, 10);
                 dinosaurModel.castShadow = true;
                 scene.add(dinosaurModel);
             });
            break;
        case 'egg':
            modelPath = '/paginaDinos/egg.glb';
            camera.position.set(1, 2, 5); 
            loader.load(modelPath, (gltf) => {
                dinosaurModel = gltf.scene;
                dinosaurModel.scale.set(0.3, 0.3, 0.3); 
                dinosaurModel.position.set(0, 1, 0); 
                dinosaurModel.castShadow = true;
                scene.add(dinosaurModel);
                controls.target.set(0, 1, 0); // Enfocar la cámara en el huevo
            });
            break;
        
    }
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / 2 / (window.innerHeight / 2);
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
});

init();
