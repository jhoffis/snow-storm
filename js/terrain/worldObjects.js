class WorldObjects {

    constructor(terrainGeometry, width) {


        /*  let a1 = new ExternalObject(scene, 'res/models/tre1/scene.gltf', 0.5, -9, y1, 0);

          new ExternalObject(scene, 'res/models/tre2/scene.gltf',0.02, -10, 15, -10 );
  */     // console.log(random)
        for (let i = 0; i < 10; i++) {

            let random = new THREE.Vector3(Math.random() * width - width / 2, 0, Math.random() * width - width / 2);
            //let random = new THREE.Vector3(-3, 0, 9);





            let yOverWater = ice.waterHeight +4;
            let ybelowTop = terrainGeometry.height -5;
            //console.log(ybelowTop)
            //console.log(yOverWater)



            let y1 = terrainGeometry.getHeightAtPrecise(random);


            if (y1 < yOverWater) {
                i--;
                continue;
            }



            console.log("y1 "+y1)

            let xTestPluss = random.x+6
            let xTestMinus = random.x-6

            let zTestPluss = random.z+6
            let zTestMinus = random.z-6

            let xTestPHeight = terrainGeometry.getHeightAtPrecise(new THREE.Vector3(xTestPluss, 0, random.z))
            let xTestMHeight = terrainGeometry.getHeightAtPrecise(new THREE.Vector3(xTestMinus, 0, random.z))

            let zTestPHeight = terrainGeometry.getHeightAtPrecise(new THREE.Vector3(random.x, 0, zTestPluss))
            let zTestMHeight = terrainGeometry.getHeightAtPrecise(new THREE.Vector3(random.x, 0, zTestMinus))



            if (((Math.abs(y1) - Math.abs(xTestPHeight)) > 1.5) || ((Math.abs(y1) - Math.abs(xTestMHeight)) > 1.5) ||
                ((Math.abs(y1) - Math.abs(zTestPHeight)) > 1.5) || ((Math.abs(y1) - Math.abs(zTestMHeight)) > 1.5) || (y1 < yOverWater)) {
                i--;
                continue;
            }

            console.log("xTestPHeight "+xTestPHeight)
            console.log("xTestMHeight "+xTestMHeight)
            console.log("zTestPHeight "+zTestPHeight)
            console.log("zTestMHeight "+zTestMHeight)




            console.log(y1)

            random.y = y1;

            let geometry = new THREE.BoxBufferGeometry(1, 1, 1);
            let material = new THREE.MeshPhongMaterial({color: 0x00ff00});
            let cube = new THREE.Mesh(geometry, material);
            cube.position.set(random.x, random.y, random.z);

                //new ExternalObject(scene, 'res/models/tre1/scene.gltf',  1, random.x, random.y, random.z);
                //new ExternalObject(scene, 'res/models/tre2/scene.gltf',  0.02, random.x, random.y, random.z);
                new ExternalObject(scene, 'res/models/tre2/scene2.gltf', 3, random.x, random.y, random.z);


            scene.add(cube)
            //console.log(cube.position)
            //AxesHelper ikke i bruk per nå
            //var axesHelper = new THREE.AxesHelper(5);
            //cube.add(axesHelper);
        }
    }

}