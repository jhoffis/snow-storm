"use strict";

class Ice {

    constructor(terrainWidth, scene){
        let waterGeometry = new THREE.PlaneBufferGeometry(terrainWidth, terrainWidth);
        let water = new Water_S(waterGeometry, {
            color: 0xffffff,
            scale: 4,
            textureWidth: 1024,
            textureHeight: 1024,
            flowSpeed: 0.05
        });
        water.position.y = 10;
        water.rotation.x = Math.PI * - 0.5;
        scene.add(water);
    }
}