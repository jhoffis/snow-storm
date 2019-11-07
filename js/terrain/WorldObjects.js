class WorldObjects {

    constructor(terrainGeometry) {

        let y1 = terrainGeometry.getHeightAtPrecise(new THREE.Vector3(-9, -1, 0))
        console.log(y1)
        let a1 = new ExternalObject(scene, 'res/models/tre1/scene.gltf', 0.5, -9, y1, 0);
        console.log(a1.position.x + ", " + a1.position.y + ", " + a1.position.z)
        //   new ExternalObject(scene, 'res/models/tre2/scene.gltf',0.02, -10, 15, -10 );

    }

}