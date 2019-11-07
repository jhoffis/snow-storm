"use strict"
class Water{

    constructor () {


        let geo = new THREE.PlaneBufferGeometry(2000, 2000, 8, 8);
        const water = new THREE.TextureLoader().load('res/textures/water_02.jpg');
        let mat = new THREE.MeshBasicMaterial({map: water, side: THREE.DoubleSide,transparent: true, opacity: 0.75});

        let plane = new THREE.Mesh(geo, mat);
        plane.position.set(0, 9.9, 0);
        scene.add(plane);
        plane.rotateX(-Math.PI / 2);
    }
}