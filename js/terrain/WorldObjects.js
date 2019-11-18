class WorldObjects {

    constructor(terrainGeometry, width, numberOfObjectsToCreate, distanceSteepnessFactor) {

        let tree = new ExternalObject(null, 'res/models/tre2/scene2.gltf', 3, 0, 0, 0, () => {
            tree.gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });


            for (let i = 0; i < numberOfObjectsToCreate; i++) {

                let random = new THREE.Vector3(Math.random() * width - width / 2, 0, Math.random() * width - width / 2);

                let yOverWater = ice.waterHeight + 4;
                let ybelowTop = terrainGeometry.height - 3;

                let y1 = terrainGeometry.getHeightAtPrecise(random);
                if (y1 < yOverWater || y1 > ybelowTop) {
                    i--;
                    continue;
                }

                //Her sjekkes y verdi rundt ett potensielt object for å sjekke om det kan bli plassert i en unormal posisjon (bakker,
                //i vann, for høyt..
                let xTestPluss = random.x + distanceSteepnessFactor
                let xTestMinus = random.x - distanceSteepnessFactor

                let zTestPluss = random.z + distanceSteepnessFactor
                let zTestMinus = random.z - distanceSteepnessFactor

                let xTestPHeight = terrainGeometry.getHeightAtPrecise(new THREE.Vector3(xTestPluss, 0, random.z))
                let xTestMHeight = terrainGeometry.getHeightAtPrecise(new THREE.Vector3(xTestMinus, 0, random.z))

                let zTestPHeight = terrainGeometry.getHeightAtPrecise(new THREE.Vector3(random.x, 0, zTestPluss))
                let zTestMHeight = terrainGeometry.getHeightAtPrecise(new THREE.Vector3(random.x, 0, zTestMinus))


                if (((Math.abs(y1) - Math.abs(xTestPHeight)) > 2.5) || ((Math.abs(y1) - Math.abs(xTestMHeight)) > 2.5) ||
                    ((Math.abs(y1) - Math.abs(zTestPHeight)) > 2.5) || ((Math.abs(y1) - Math.abs(zTestMHeight)) > 2.5) || (y1 < yOverWater)) {
                    i--;
                    continue;
                }
                random.y = y1;

                let newTree = new ExternalObject(scene, tree.gltf, 3, random.x, random.y - 0.5, random.z);

            }

        });
    }
}