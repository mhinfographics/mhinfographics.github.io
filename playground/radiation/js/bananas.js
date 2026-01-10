document.addEventListener('DOMContentLoaded', function () {
    function createBananaPile(containerId, bananaTexturePaths) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Banana pile container not found: ${containerId}`);
            return;
        }

        function getSceneSize() {
            const rect = container.getBoundingClientRect();
            const width = container.clientWidth || rect.width;
            const height = container.clientHeight || rect.height || window.innerHeight * 0.75;
            return { width, height };
        }

        let { width: sceneWidth, height: sceneHeight } = getSceneSize();

        // Three.js setup
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(sceneWidth / -2, sceneWidth / 2, sceneHeight / 2, sceneHeight / -2, 1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(sceneWidth, sceneHeight);
        container.appendChild(renderer.domElement);

        camera.position.z = 500;

        // Matter.js setup
        const engine = Matter.Engine.create();
        const world = engine.world;
        engine.world.gravity.y = 1;

        // Banana textures (variations)
        const textureLoader = new THREE.TextureLoader();
        const bananaTextures = bananaTexturePaths.map((path) => textureLoader.load(path));

        const bananaWidth = 4;
        const bananaHeight = bananaWidth * 2.66;

        const bananaGeometry = new THREE.PlaneGeometry(bananaWidth, bananaHeight);
        const bananaMaterials = bananaTextures.map((texture) => (
            new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide })
        ));
        function getRandomBananaMaterial() {
            return bananaMaterials[Math.floor(Math.random() * bananaMaterials.length)];
        }

        const bananas = [];
        const bananaBodies = [];

        // Ground
        const groundThickness = 50;
        const wallThickness = 50;
        const getBodyHalfHeight = () => (bananaHeight * 0.5) / 2;

        let groundBody = Matter.Bodies.rectangle(
            sceneWidth / 2,
            sceneHeight + groundThickness / 2,
            sceneWidth,
            groundThickness,
            { isStatic: true }
        );
        Matter.World.add(world, groundBody);

        // Walls to form a pile shape
        let wallLeft = Matter.Bodies.rectangle(-wallThickness / 2, sceneHeight / 2, wallThickness, sceneHeight * 2, { isStatic: true });
        let wallRight = Matter.Bodies.rectangle(sceneWidth + wallThickness / 2, sceneHeight / 2, wallThickness, sceneHeight * 2, { isStatic: true });

        Matter.World.add(world, [wallLeft, wallRight]);

        // Create base pile of bananas
        const baseBananas = 17500;
        const pileWidth = 720;
        const pileHeight = 340;
        const pileTaper = 0.80; // higher = narrower top, base unchanged
        for (let i = 0; i < baseBananas; i++) {
            const t = i / (baseBananas - 1);
            const widthFactor = 1 - t * pileTaper;
            const x = (sceneWidth / 2) + (Math.random() - 0.5) * pileWidth * widthFactor;
            const y = sceneHeight - getBodyHalfHeight() - t * pileHeight - (Math.random() * 20);
            const angle = (Math.random() - 0.5) * Math.PI; // random initial rotation

            const bananaBody = Matter.Bodies.rectangle(x, y, bananaWidth * 0.5, bananaHeight * 0.5, {
                isStatic: true,
                restitution: 0.1,
                friction: 0.9,
                angle
            });
            Matter.World.add(world, bananaBody);

            const bananaMesh = new THREE.Mesh(bananaGeometry, getRandomBananaMaterial());
            scene.add(bananaMesh);

            bananas.push(bananaMesh);
            bananaBodies.push(bananaBody);
        }

        // Create constantly falling bananas
        const fallingBananasCount = 40;
        function addFallingBanana() {
            if (bananaBodies.length >= baseBananas + fallingBananasCount) {
                // Remove the oldest banana that is not part of the base pile
                const oldestBananaIndex = baseBananas;
                Matter.World.remove(world, bananaBodies[oldestBananaIndex]);
                scene.remove(bananas[oldestBananaIndex]);
                bananaBodies.splice(oldestBananaIndex, 1);
                bananas.splice(oldestBananaIndex, 1);
            }

            const x = sceneWidth / 2 + (Math.random() - 0.5) * 180;
            const y = -50;
            const angle = (Math.random() - 0.5) * Math.PI;
            const bananaBody = Matter.Bodies.rectangle(x, y, bananaWidth * 0.5, bananaHeight * 0.5, { restitution: 0.4, friction: 0.2, angle });
            Matter.World.add(world, bananaBody);

            const bananaMesh = new THREE.Mesh(bananaGeometry, getRandomBananaMaterial());
            scene.add(bananaMesh);

            bananas.push(bananaMesh);
            bananaBodies.push(bananaBody);
        }

        setInterval(addFallingBanana, 200);

        function animate() {
            requestAnimationFrame(animate);

            // Update physics
            Matter.Engine.update(engine);

            // Update Three.js meshes with Matter.js bodies
            for (let i = 0; i < bananas.length; i++) {
                bananas[i].position.x = bananaBodies[i].position.x - sceneWidth / 2;
                bananas[i].position.y = -(bananaBodies[i].position.y - sceneHeight / 2);
                bananas[i].rotation.z = bananaBodies[i].angle;
            }

            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener('resize', () => {
            const { width: newWidth, height: newHeight } = getSceneSize();
            sceneWidth = newWidth;
            sceneHeight = newHeight;

            renderer.setSize(newWidth, newHeight);

            camera.left = newWidth / -2;
            camera.right = newWidth / 2;
            camera.top = newHeight / 2;
            camera.bottom = newHeight / -2;
            camera.updateProjectionMatrix();

            // Rebuild static bodies on resize (simpler + avoids vertex math issues)
            Matter.World.remove(world, [groundBody, wallLeft, wallRight]);

            groundBody = Matter.Bodies.rectangle(
                newWidth / 2,
                newHeight + groundThickness / 2,
                newWidth,
                groundThickness,
                { isStatic: true }
            );

            wallLeft = Matter.Bodies.rectangle(-wallThickness / 2, newHeight / 2, wallThickness, newHeight * 2, { isStatic: true });
            wallRight = Matter.Bodies.rectangle(newWidth + wallThickness / 2, newHeight / 2, wallThickness, newHeight * 2, { isStatic: true });

            Matter.World.add(world, [groundBody, wallLeft, wallRight]);
        });
    }

    createBananaPile('banana-pile', [
        'img/tiny-banana-yellow2.png',
        'img/tiny-banana-yellow1.png',
        'img/tiny-banana-green.png'
    ]);

    createBananaPile('rotten-pile', [
        'img/tiny-banana-brown.png',
        'img/tiny-banana-yellow1.png',
        'img/tiny-banana-black.png'
    ]);
});
