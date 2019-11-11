class WorldObjects {

    constructor(terrainGeometry, width) {


        /*  let a1 = new ExternalObject(scene, 'res/models/tre1/scene.gltf', 0.5, -9, y1, 0);

          new ExternalObject(scene, 'res/models/tre2/scene.gltf',0.02, -10, 15, -10 );
  */     // console.log(random)
        for (let i = 0; i < 10; i++) {

            let random = new THREE.Vector3(Math.random() * width - width / 2, 0, Math.random() * width - width / 2);
            //let random = new THREE.Vector3(-3, 0, 9);

            let yOverWater = ice.waterHeight +1;
            let ybelowTop = terrainGeometry.height -5;
            //console.log(ybelowTop)
            //console.log(yOverWater)



            let y1 = terrainGeometry.getHeightAtPrecise(random);
            if (y1 < yOverWater) {
                i--;
                continue;
            }


            console.log(y1)

            random.y = y1;

            let geometry = new THREE.BoxBufferGeometry(1, 1, 1);
            let material = new THREE.MeshPhongMaterial({color: 0x00ff00});
            let cube = new THREE.Mesh(geometry, material);
            cube.position.set(random.x, random.y, random.z);
            if (y1 > yOverWater && y1<ybelowTop) {
                //new ExternalObject(scene, 'res/models/tre1/scene.gltf',  3, random.x, random.y, random.z);
                new ExternalObject(scene, 'res/models/tre2/scene.gltf', 0.02, random.x, random.y, random.z);
            }
            scene.add(cube)
            //console.log(cube.position)
        }
    }

}