"use strict";

class Ice {


    constructor(terrainWidth, scene) {
        let waterHeight = 10;
        let waterSize = 2000;
        let waterGeometry = new THREE.PlaneBufferGeometry(terrainWidth, terrainWidth);
        let water = new Water_S(waterGeometry, {
            color: 0xffffff,
            scale: 4,
            textureWidth: 1024,
            textureHeight: 1024,
            flowSpeed: 0.01
        });
        water.position.y = waterHeight;
        water.rotation.x = Math.PI * -0.5;
        scene.add(water);

    }
/*
    get waterHeight() {
        return this.waterHeight;
    }

 */
}