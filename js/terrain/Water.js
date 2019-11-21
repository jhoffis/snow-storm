"use strict"
class Water{

    constructor (terrainWidth) {


        let geo = new THREE.PlaneBufferGeometry(terrainWidth*2, terrainWidth*2, 8, 8);
        const water = new THREE.TextureLoader().load('res/textures/water_02.jpg');
        let mat = new THREE.MeshBasicMaterial({map: water, side: THREE.DoubleSide,transparent: true, opacity: 0.45});

        let plane = new THREE.Mesh(geo, mat);
        plane.position.set(0, 9.9, 0);
        scene.add(plane);
        plane.rotateX(-Math.PI / 2);
    }
}