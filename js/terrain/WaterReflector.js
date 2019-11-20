"use strict";

class WaterReflector {


    constructor(terrainWidth, scene) {
        this.waterHeight = 10;
        let waterSize = 2000;
        let waterGeometry = new THREE.PlaneBufferGeometry(terrainWidth, terrainWidth);
        let water = new Water_S(waterGeometry, {
            color: 0xffffff,
            scale: 4,
            textureWidth: 1024,
            textureHeight: 1024,
            flowSpeed: 0.01
        });
        water.position.y = this.waterHeight;
        water.rotation.x = Math.PI * -0.5;
        scene.add(water);

    }

}