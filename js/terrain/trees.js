"use strict";

class Trees {
    constructor(terrain, terrainWidth, scene) {
        //creating tree variable, with 100 trees
        let treeCount = 100,
            treeGeometry = new THREE.BoxGeometry(1, 3, 1),
            treeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000})
        //creating each individual tree
        for (let i = 0; i < treeCount; i++) {
            let pX = Math.random() * terrainWidth - terrainWidth/2,
                pZ = Math.random() * terrainWidth - terrainWidth/2,
                pY = terrain.getHeightAtPrecise(new THREE.Vector3(pX, 0, pZ)),
                tree = new THREE.Vector3(pX, pY, pZ);

            //pushing trees to the geometry
            treeGeometry.vertices.push(tree);
        }

        let treeSystem = new THREE.Points(
            treeGeometry,
            treeMaterial
        );

        scene.add(treeSystem);
    }


}